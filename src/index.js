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
		end: new Date(2019, 4, 18).getTime()
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
	dayjs: dayjs,

	data: {
		currentIdealBalanceIndex: null,
		quickBalance: null,
		now: Date.now(),
		parsedRawData: null,
		processedView: false, // if we're displaying a semester other than the current one
		rawData: '',
		rawDataError: false,
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
		remainingBalanceIdeal: function () {
			return this.getIdealBalanceAtDate(this.now);
		},
		remainingBalanceRelative: function () {
			return this.remainingBalance - this.remainingBalanceIdeal;
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
		},

		startBalance: function (startBalance, oldStartBalance) {
			if (startBalance !== oldStartBalance) {
				if (!this.processedView) {
					this.remainingBalance = this.remainingBalanceIdeal;
				}
				this.makeChart();
			}
		}
	},

	mounted: function () {
		// this.now = new Date().setMonth(1); // DEBUG

		this.remainingBalance = this.remainingBalanceIdeal;
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

		getIdealBalanceAtDate: function (date) {
			date = Math.max(this.semester.start, Math.min(date, this.semester.end));
			var msOverall = this.semester.end - this.semester.start;
			var msFuture = this.semester.end - date;

			return (msFuture / msOverall) * this.startBalance;
		},

		getIdealBalanceData: function () {
			var msPerDay = 1000 * 60 * 60 * 24;
			var idealBalanceData = [];

			for (var date = this.semester.start; date < this.semester.end; date += msPerDay) {
				idealBalanceData.push([date, this.getIdealBalanceAtDate(date)]);

				if (this.now >= date && this.now < date + msPerDay) {
					var MS_PER_MINUTE = 1000 * 60;
					var nowNearestMinute = Math.floor(this.now / MS_PER_MINUTE) * MS_PER_MINUTE;
					idealBalanceData.push({
						x: nowNearestMinute,
						y: this.remainingBalanceIdeal,
						marker: {
							enabled: true
						}
					});
					this.currentIdealBalanceIndex = idealBalanceData.length - 1;
				}
			}

			// always include the last data point ($0)
			idealBalanceData.push({
				x: this.semester.end,
				y: 0,
				marker: {
					enabled: (this.currentIdealBalanceIndex === null)
				}
			});

			if (this.currentIdealBalanceIndex === null) {
				this.currentIdealBalanceIndex = idealBalanceData.length - 1;
			}

			return idealBalanceData;
		},

		/**
		 * @param {[number, number][]} [data] - array of points of the format [timestamp, amount]
		 * @returns {Highcharts.ChartObject}
		 */
		makeChart: function (data) {
			var idealBalanceData = [
				[this.semester.start, this.startBalance],
				[this.semester.end, 0]
			];
			if (this.inSemester) {
				idealBalanceData.splice(1, 0, [this.now, this.remainingBalanceIdeal]);
			}

			var series = [
				{
					name: 'Ideal balance',
					color: 'red',
					lineWidth: 1,
					enableMouseTracking: !data,
					data: this.getIdealBalanceData()
				}
			];

			if (data) {
				series.push({
					name: 'Actual balance',
					color: 'steelblue',
					step: (this.quickBalance == null) ? 'left' : null,
					data: data,
					tooltip: {
						pointFormatter: function () {
							return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ': <b>$' + this.y.toFixed(2) + '</b><br/>' +
								'<span style="color:red">\u25CF</span> Ideal balance: <b>$' + vm.getIdealBalanceAtDate(this.x).toFixed(2) + '</b><br/>';
						}
					}
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

			var _this = this;

			return Highcharts.chart('chart', {
				chart: {
					type: 'line',
					events: {
						load: function () {
							var point = this.series[0].data[_this.currentIdealBalanceIndex];
							this.tooltip.refresh(point);
						}
					}
				},
				title: {
					text: this.semester.name + ' Flex Point Usage'
				},
				xAxis: {
					crosshair: {
						snap: false
					},
					labels: {
						format: '{value:%b %e}'
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
					// split: true,
					dateTimeLabelFormats: {
						day: '%a, %B %e',
						minute: '%a, %B %e, %l:%M %p'
					},
					valueDecimals: 2,
					valuePrefix: '$'
				},
				time: {
					useUTC: false
				}
			});
		},

		useDemo: function () {
			// DEBUG
			var now = Date.parse('2018-04-01');
			Flex.demoText = Flex.demoText.filter(function (entry) {
				return entry[0] < now;
			}, this);

			this.startBalance = Flex.demoText[0][1];
			this.remainingBalance = Flex.demoText[Flex.demoText.length - 1][1];
			this.now = Flex.demoText[Flex.demoText.length - 1][0];

			this.processedView = true;
			this.makeChart(Flex.demoText);
		},

		useQuickBalance: function () {
			this.now = Date.now();

			this.remainingBalance = this.quickBalance;
			var balanceData = [
				[this.semester.start, this.startBalance],
				[this.now, this.remainingBalance]
			];

			this.processedView = true;
			this.makeChart(balanceData);
			this.quickBalance = null;
		}
	}
});


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

	vm.parsedRawData = [];
	var previousChange = 0;
	var reachedBeginning = false;

	for(var i = 0; i < data.length && !reachedBeginning; i++) {
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

				var firstAmount = vm.parsedRawData[0] ? vm.addCurrency(vm.parsedRawData[0][1], -previousChange) : 0;
				previousChange = amountChange;

				vm.parsedRawData.unshift([date, firstAmount]);

				if (amountChange === vm.startBalance) {
					reachedBeginning = true;
				}
			}
		}
	}

	// Check for invalid data supplied
	if (vm.parsedRawData.length === 0) {
		vm.rawDataError = true;
		return;
	}

	vm.rawDataError = false;

	if (reachedBeginning && vm.parsedRawData[0][1] !== vm.startBalance) {
		var adjustmentAmount = vm.startBalance - vm.parsedRawData[0][1];

		vm.parsedRawData = vm.parsedRawData.map(function (original) {
			original[1] = vm.addCurrency(original[1], adjustmentAmount);
			return original;
		});
	}

	vm.remainingBalance = vm.parsedRawData[vm.parsedRawData.length - 1][1];

	if (vm.remainingBalance !== 0) {
		vm.parsedRawData.push([vm.now, vm.remainingBalance]);
	}

	vm.processedView = true;
	vm.makeChart(vm.parsedRawData);
};
