'use strict';
/* eslint-env browser */
/* global Vue, Highcharts, dayjs, sampleData */

var Flex = {};

var vm = new Vue({
	el: '#flexible',
	data: {
		remainingBalance: 500,
		startBalance: 500
	},
	computed: {
		spentBalance: function () {
			return (this.startBalance * 100 - this.remainingBalance * 100) / 100;
		}
	},
	methods: {
		formatDate: function (date) {
			return dayjs(date).format('MMMM D, YYYY');
		},
		useDemo: function () {
			this.startBalance = Flex.demoText[0][1];
			this.remainingBalance = Flex.demoText[Flex.demoText.length - 1][1];
			Flex.processData(Flex.demoText);
		}
	}
});

Flex.demoText = sampleData;

/* Array of semester data (starting with LATEST semester)
 * Keys in object:
 *   year: year plus 0.1 if spring, 0.2 if fall
 *   name: human-readable name: [Spring|Fall] <year>
 *   start: unix time of the start of the semester
 *   end: unix time of the end of the semester
 */
Flex.semesters = [
	{
		year: 2019.1,
		name: 'Spring 2019',
		start: 1547337600000, // Date.parse('2019-01-13')
		end: 1557532800000 // Date.parse('2019-05-11')
	},
	{
		year: 2018.2,
		name: 'Fall 2018',
		start: 1534482000000, // Date.parse('2018-8-17')
		end: 1544918400000 // Date.parse('2018-12-16')
	},
	{
		year: 2018.1,
		name: 'Spring 2018',
		start: 1515888000000, // Date.parse('2018-01-14')
		end: 1526169600000 // Date.parse('2018-05-13')
	}
];
Flex.now = Date.now();
Flex.now = Date.parse('2018-04-01');

// DEBUG
Flex.demoText = Flex.demoText.filter(function (entry) {
	return entry[0] < Flex.now;
});

Flex.semesters.forEach(function (semester) {
	// If we're already past the start of the semester
	if (Flex.now > semester.start) {
		Flex.semester = semester;
		Flex.inSemester = (Flex.now < semester.end);
	}
});

/**
 * @private
 * @param {number} amount - the currency amount, as a float
 * @returns {string} the amount, formatted with a dollar sign and rounded to two decimal places
 */
Flex.formatCurrency = function (amount) {
	if (typeof amount !== 'number') return '';

	return '$' + amount.toFixed(2);
};

/**
 * Function to add two numbers that avoids floating-point errors like .1 + .2 !== .3
 * @private
 * @param {number} x
 * @param {number} y
 * @returns {number} x + y, with two digits of precision
 */
Flex.addCurrency = function (x, y) {
	return Math.round((x + y) * 100) / 100;
};


/**
 * @param {array} data - array of points of the format [timestamp, amount]
 */
Flex.makeChart = function (data) {
	var series = [
		{
			name: 'Ideal usage',
			color: 'red',
			lineWidth: 1,
			enableMouseTracking: false,
			data: [
				[Flex.semester.start, vm.startBalance],
				[Flex.semester.end, 0]
			]
		},
		{
			name: 'Actual balance',
			color: 'steelblue',
			step: 'left',
			data: data
		}
	];

	// If we're in the middle of the semester, add a dashed line with projected usage
	if (Flex.inSemester) {
		series.push({
			name: 'Projected balance',
			color: 'steelblue',
			dashStyle: 'shortdash',
			enableMouseTracking: false,
			data: [
				[Flex.now, vm.remainingBalance],
				[Flex.semester.end, 0]
			]
		});
	}

	return Highcharts.chart('chart', {
		chart: {
			type: 'line'
		},
		title: {
			text: Flex.semester.name + ' Flex Point Usage'
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
};

/**
 * @param {object} obj - object containing the following floats:
 * pastPerDay, pastPerWeek, futurePerDay, futurePerWeek
 */
Flex.addRates = function (obj) {
	for (var id in obj) {
		var $el = document.getElementById(id);
		var amount = obj[id];

		// sanity check: make sure element exists and amount is a number
		if ($el && typeof amount === 'number') {
			$el.textContent = Flex.formatCurrency(amount);
		}
	}
};

Flex.calculateRates = function () {
	var MS_PER_DAY = 1000 * 60 * 60 * 24;
	var DAYS_PER_WEEK = 7;
	var returnObj = {};

	if (Flex.inSemester) {
		var msElapsed = Flex.now - Flex.semester.start;
		var daysElapsed = msElapsed / MS_PER_DAY;
		var weeksElapsed = daysElapsed / DAYS_PER_WEEK;

		var msRemaining = Flex.semester.end - Flex.now;
		var daysRemaining = msRemaining / MS_PER_DAY;
		var weeksRemaining = daysRemaining / DAYS_PER_WEEK;

		returnObj = {
			pastPerDay: vm.remainingBalance / daysElapsed,
			pastPerWeek: vm.remainingBalance / weeksElapsed,
			pastTotal: vm.remainingBalance,
			futurePerDay: vm.remainingBalance / daysRemaining,
			futurePerWeek: vm.remainingBalance / weeksRemaining,
			futureTotal: vm.remainingBalance
		};
	} else {
		var msSemester = Flex.semester.end - Flex.semester.start;
		var daysSemester = msSemester / MS_PER_DAY;
		var weeksSemester = daysSemester / DAYS_PER_WEEK;

		returnObj = {
			pastPerDay: vm.startBalance / daysSemester,
			pastPerWeek: vm.startBalance / weeksSemester,
			pastTotal: vm.startBalance
		};
	}

	return returnObj;
};

/**
 * @param {number[][]} dataArr
 */
Flex.processData = function (dataArr) {
	var latestDate = dataArr[dataArr.length - 1][0];

	for(var i = 0; i < Flex.semesters.length; i++) {
		var semester = Flex.semesters[i];
		if (latestDate > semester.start) {
			Flex.semester = semester;
			Flex.inSemester = (vm.remainingBalance !== 0);
			break;
		}
	}

	var ratesObj = Flex.calculateRates();
	Flex.addRates(ratesObj);

	Flex.makeChart(dataArr);
};

// How we parse:
// Iterate through the table data (which is in reverse chronological order)
// Prepend each flex point change to the beginning of the data list, assuming for now that it ends at zero.
// Stop iterating when we reach a row that is the addition of the full balance (i.e., the semester start).
// If this is never reached (i.e., some data is missing), ask them for their current balance and attempt to
// display the data that way.
Flex.parseRawData = function (rawData) {
	Flex.now = Date.now(); // in case the page has been loaded for a long time

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
				// && date < Flex.now // debug
			) {
				// account for positive/negative changes
				if (minusMatch && minusMatch.index < spentMatch.index) {
					amountChange = -amountChange;
				}

				var firstAmount = flexData[0] ? Flex.addCurrency(flexData[0][1], -previousChange) : 0;
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
			original[1] = Flex.addCurrency(original[1], adjustmentAmount);
			return original;
		});
	}

	vm.remainingBalance = flexData[flexData.length - 1][1];

	if (vm.remainingBalance !== 0) {
		flexData.push([Flex.now, vm.remainingBalance]);
	}

	Flex.processData(flexData);
};

//// Event Listeners ////

document.addEventListener('DOMContentLoaded', vm.useDemo);

document.forms['raw-data-form'].addEventListener('submit', function (event) {
	event.preventDefault();

	Flex.formData = {};

	for(var field of document.forms['raw-data-form'].elements) {
		Flex.formData[field.id] = field.value;
	}

	Flex.parseRawData(Flex.formData['raw-data']);
});
