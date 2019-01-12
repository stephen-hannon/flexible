'use strict';
/* eslint-env browser */
/* global Vue, Highcharts, dayjs, sampleData */

var Flex = {};

Flex.softSemesterLimit = 1000 * 60 * 60 * 24 * 7; // 1 week

Flex.demoText = sampleData;

/* Array of semester data (starting with LATEST semester)
 * Keys in object:
 *   year: year plus 0.1 if spring, 0.2 if fall
 *   name: human-readable name: [Spring|Fall] <year>
 *   start: unix time of the start of the semester (when using new Date, subtract 1 from the month first)
 *   end: unix time of the end of the semester (when using new Date, subtract 1 from the month first)
 */
Flex.semesters = [
	{
		year: 2019.1,
		name: 'Spring 2019',
		start: new Date(2019, 0, 13).getTime(),
		end: new Date(2019, 4, 11).getTime()
	},
	{
		year: 2018.2,
		name: 'Fall 2018',
		start: new Date(2018, 7, 17).getTime(),
		end: new Date(2018, 11, 16).getTime()
	},
	{
		year: 2018.1,
		name: 'Spring 2018',
		start: new Date(2018, 0, 14).getTime(),
		end: new Date(2018, 4, 13).getTime()
	}
];

var vm = new Vue({
	el: '#flexible',

	data: {
		now: Date.now(),
		processedView: false, // if we're displaying a semester other than the current one
		rawData: '',
		remainingBalance: null,
		startBalance: 500
	},

	computed: {
		currentSemester: function () {
			return this.findSemester(Date.now());
		},
		inSemester: function () {
			return (this.now > this.semester.start - Flex.softSemesterLimit);
		},
		rates: function () {
			if (!this.semester) {
				return {
					past: null,
					future: null,
					overall: null
				};
			}

			var MS_PER_DAY = 1000 * 60 * 60 * 24;
			var DAYS_PER_WEEK = 7;

			var msPast = Math.min(this.now, this.semester.end) - this.semester.start;
			var daysPast = msPast / MS_PER_DAY;
			var weeksPast = daysPast / DAYS_PER_WEEK;

			var msFuture = this.semester.end - Math.max(this.now, this.semester.start);
			var daysFuture = msFuture / MS_PER_DAY;
			var weeksFuture = daysFuture / DAYS_PER_WEEK;

			var msOverall = this.semester.end - this.semester.start;
			var daysOverall = msOverall / MS_PER_DAY;
			var weeksOverall = daysOverall / DAYS_PER_WEEK;

			return {
				past: {
					total: this.spentBalance,
					perDay: this.spentBalance / daysPast,
					perWeek: this.spentBalance / weeksPast
				},
				future: {
					total: this.remainingBalance,
					perDay: this.remainingBalance / daysFuture,
					perWeek: this.remainingBalance / weeksFuture
				},
				overall: {
					total: this.startBalance,
					perDay: this.startBalance / daysOverall,
					perWeek: this.startBalance / weeksOverall
				}
			};
		},
		semester: function () {
			return this.findSemester(this.now);
		},
		spentBalance: function () {
			return this.addCurrency(this.startBalance, -this.remainingBalance);
		}
	},

	watch: {
		rawData: function (rawData) {
			if (rawData) {
				// TODO: do a basic validity check, and clear the input if it passes
				Flex.parseRawData(rawData);
			}
		}
	},

	mounted: function () {
		this.remainingBalance = this.startBalance;
		this.makeChart();
	},

	methods: {
		/**
		 * Function to add two numbers that avoids floating-point errors like .1 + .2 !== .3
		 * @private
		 * @param {number} x
		 * @param {number} y
		 * @returns {number} x + y, with two digits of precision
		 */
		addCurrency: function (x, y) {
			return Math.round(x * 100 + y * 100) / 100;
		},

		findSemester: function (date) {
			return Flex.semesters.reduce(function(prevSemester, curSemester) {
				// Find the last semester where we haven't reached the end
				return (date < curSemester.end + Flex.softSemesterLimit) ? curSemester : prevSemester;
			});
		},

		/**
		 * @param {number} num - the currency amount, as a float
		 * @returns {string} the amount, formatted with a dollar sign and rounded to two decimal places
		 */
		formatCurrency: function (num) {
			// TODO: handle negatives
			return (typeof num === 'number') ? '$' + num.toFixed(2) : num;
		},

		/** temporary */
		formatCurrencyOutput: function (num) {
			return '$' + ((typeof num === 'number') ? num.toFixed(2) : '\u2014');
		},

		formatDate: function (date) {
			return dayjs(date).format('MMMM D, YYYY');
		},

		/**
		 * @param {[number, number][]} [data] - array of points of the format [timestamp, amount]
		 * @returns {Highcharts.ChartObject}
		 */
		makeChart: function (data) {
			var series = [
				{
					name: 'Ideal usage',
					color: 'red',
					lineWidth: 1,
					enableMouseTracking: false,
					data: [
						[this.semester.start, this.startBalance],
						[this.semester.end, 0]
					]
				}
			];

			if (data) {
				series.push({
					name: 'Actual balance',
					color: 'steelblue',
					step: 'left',
					data: data
				});

				// If we're in the middle of the semester, add a dashed line with projected usage
				if (this.inSemester && this.remainingBalance !== 0) {
					series.push({
						name: 'Projected balance',
						color: 'steelblue',
						dashStyle: 'shortdash',
						enableMouseTracking: false,
						data: [
							[this.now, this.remainingBalance],
							[this.semester.end, 0]
						]
					});
				}
			}

			return Highcharts.chart('chart', {
				chart: {
					type: 'line'
				},
				title: {
					text: this.semester.name + ' Flex Point Usage'
				},
				xAxis: {
					crosshair: {
						snap: false
					},
					type: 'datetime'
				},
				yAxis: {
					crosshair: {
						snap: false
					},
					title: {
						text: 'Flex Points'
					},
					labels: {
						format: '${value}'
					}
				},
				plotOptions: {
					line: {
						marker: {
							enabled: false
						}
					}
				},
				series: series,
				tooltip: {
					valueDecimals: 2,
					valuePrefix: '$'
				}
			});
		},

		useDemo: function () {
			// DEBUG
			this.now = Date.parse('2018-04-01');
			Flex.demoText = Flex.demoText.filter(function (entry) {
				return entry[0] < this.now;
			}, this);

			this.startBalance = Flex.demoText[0][1];
			this.remainingBalance = Flex.demoText[Flex.demoText.length - 1][1];
			Flex.processData(Flex.demoText);
		}
	}
});


/**
 * @param {number[][]} dataArr
 */
Flex.processData = function (dataArr) {
	vm.processedView = true;
	vm.now = dataArr[dataArr.length - 1][0];

	vm.makeChart(dataArr);
};

// How we parse:
// Iterate through the table data (which is in reverse chronological order)
// Prepend each flex point change to the beginning of the data list, assuming for now that it ends at zero.
// Stop iterating when we reach a row that is the addition of the full balance (i.e., the semester start).
// If this is never reached (i.e., some data is missing), ask them for their current balance and attempt to
// display the data that way.
Flex.parseRawData = function (rawData) {
	vm.now = Date.now(); // in case the page has been loaded for a long time

	var data = rawData.split('\n').map(function (row) {
		return row.split('\t');
	});

	vm.remainingBalance = vm.startBalance;
	var flexData = [];
	var previousChange = 0;
	var reachedBeginning = false;

	for(var i = 0; i < data.length; i++) {
		var row = data[i];

		if (row.length >= 4 && row[0] === 'Flex Points') {
			// TODO: use a library to parse the date dependably
			var dateString = row[1]
				.replace(/\s/g, ' ')
				.replace(/\B[AP]M/, ' $&'); // Add space before AM or PM so Date.parse understands it.
			var date = Date.parse(dateString);

			var minusMatch = row[3].match(/[-\u2013]/); // look for a minus sign (hyphen or en-dash)
			var spentMatch = row[3].match(/[\d.]+/);
			var amountChange = spentMatch ? +spentMatch[0] : null;

			if (
				!isNaN(date) &&
				amountChange !== null
				// && date < vm.now // debug
			) {
				// account for positive/negative changes
				if (minusMatch && minusMatch.index < spentMatch.index) {
					amountChange = -amountChange;
				}

				var firstAmount = flexData[0] ? vm.addCurrency(flexData[0][1], -previousChange) : 0;
				previousChange = amountChange;

				flexData.unshift([date, firstAmount]);

				if (amountChange === vm.startBalance) {
					reachedBeginning = true;
					break;
				}
			}
		}
	}

	if (reachedBeginning && flexData[0][1] !== vm.startBalance) {
		var adjustmentAmount = vm.startBalance - flexData[0][1];

		flexData = flexData.map(function (original) {
			original[1] = vm.addCurrency(original[1], adjustmentAmount);
			return original;
		});
	}

	vm.remainingBalance = flexData[flexData.length - 1][1];

	if (vm.remainingBalance !== 0) {
		flexData.push([vm.now, vm.remainingBalance]);
	}

	Flex.processData(flexData);
};
