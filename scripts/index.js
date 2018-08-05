'use strict';
/* eslint-env browser */
/* global Highcharts */

var Flex = {};

Flex.demoText = '';

/* Array of semester data (starting with LATEST semester)
 * Keys in object:
 *   year: year plus 0.1 if spring, 0.2 if fall
 *   name: human-readable name: [Spring|Fall] <year>
 *   start: unix time of the start of the semester
 *   end: unix time of the end of the semester
 */
Flex.semesters = [
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
//Flex.NOW = Date.parse('2018-04-01');//1523577600000;
Flex.NOW = Date.now();
Flex.START_AMOUNT = 500;
// TODO: permit other Flex Point plans: https://dining.nd.edu/services/meal-plans/on-campus-undergrads/

Flex.semesters.forEach(function (semester) {
	// If we're already past the start of the semester
	if (Flex.NOW > semester.start) {
		Flex.semester = semester;
		Flex.IN_SEMESTER = (Flex.NOW < semester.end);
	}
});


/**
 * @param {array} data - array of points of the format [timestamp, amount]
 */
Flex.makeChart = function (data) {
	if (Flex.IN_SEMESTER) {
		// add one final data point with current balance
		data.push([Flex.NOW, Flex.amountRemaining]);
	}
	
	var series = [
		{
			name: 'Ideal usage',
			color: 'red',
			lineWidth: 1,
			enableMouseTracking: false,
			data: [
				[Flex.semester.start, Flex.START_AMOUNT],
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
	if (Flex.IN_SEMESTER) {
		series.push({
			name: 'Projected balance',
			color: 'steelblue',
			dashStyle: 'shortdash',
			enableMouseTracking: false,
			data: [
				[Flex.NOW, Flex.amountRemaining],
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
//			max: Flex.START_AMOUNT,
			min: 0,
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
			$el.textContent = '$' + amount.toFixed(2);
		}
	}
	
	var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var now = new Date(Flex.NOW);
	var dateString = MONTHS[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
	
	document.getElementById('results-header').textContent = 'Results: $' + Flex.amountRemaining.toFixed(2) + ' remaining as of ' + dateString;
}

Flex.loadDemoData = function (evt) {
	evt.preventDefault();
	
	if (Flex.demoText) {
		Flex.amountRemaining = Flex.demoText[Flex.demoText.length - 1][1];
		Flex.processData(Flex.demoText);
		return; // if we've already gotten the text, don't get it again
	}
	
	var xhr = new XMLHttpRequest();
	xhr.addEventListener('load', function () {
		if (this.status >= 400) {
			alert('Error loading demo data:\n' + this.statusText + '\n' + this.responseText);
		} else {
			try {
				Flex.demoText = JSON.parse(this.responseText).data;
				
				//DEBUG
				Flex.demoText = Flex.demoText.filter(function (entry) {
					return entry[0] < Flex.NOW;
				});
				
				Flex.amountRemaining = Flex.demoText[Flex.demoText.length - 1][1];
				
				Flex.processData(Flex.demoText);
			} catch (err) {
				alert('Error parsing demo data');
				throw err;
			}
		}
	});
	xhr.addEventListener('error', function () {
		alert('Error loading demo data');
	});
	
	xhr.overrideMimeType('application/json');
	xhr.open('GET', './sample-data.json');
	xhr.send();
}

Flex.calculateRates = function () {
	var MS_PER_DAY = 1000 * 60 * 60 * 24;
	var DAYS_PER_WEEK = 7;
	
	if (Flex.IN_SEMESTER) {
		var msElapsed = Flex.NOW - Flex.semester.start;
		var daysElapsed = msElapsed / MS_PER_DAY;
		var weeksElapsed = daysElapsed / DAYS_PER_WEEK;

		var msRemaining = Flex.semester.end - Flex.NOW;
		var daysRemaining = msRemaining / MS_PER_DAY;
		var weeksRemaining = daysRemaining / DAYS_PER_WEEK;

		var returnObj = {
			pastPerDay: Flex.AMOUNT_SPENT / daysElapsed,
			pastPerWeek: Flex.AMOUNT_SPENT / weeksElapsed,
			futurePerDay: Flex.amountRemaining / daysRemaining,
			futurePerWeek: Flex.amountRemaining / weeksRemaining
		};
	} else {
		var msSemester = Flex.semester.end - Flex.semester.start;
		var daysSemester = msSemester / MS_PER_DAY;
		var weeksSemester = daysSemester / DAYS_PER_WEEK;
		
		var returnObj = {
			pastPerDay: Flex.START_AMOUNT / daysSemester,
			pastPerWeek: Flex.START_AMOUNT / weeksSemester
		};
	}
	
	return returnObj;
}

Flex.processData = function (dataArr) {
	Flex.AMOUNT_SPENT = Flex.START_AMOUNT - Flex.amountRemaining;
	
	var ratesObj = Flex.calculateRates();
	Flex.addRates(ratesObj);
	
	Flex.makeChart(dataArr);
}

Flex.parseRawData = function () {
	var rawData = document.getElementById('raw-data').value;
	
	var data = rawData.split('\n').reverse().map(function (row) {
		return row.split('\t');
	});
	
	Flex.amountRemaining = Flex.START_AMOUNT;
	var flexData = [
		[Flex.semester.start, Flex.START_AMOUNT]
	];
	
	data.forEach(function (row) {
		if (row[0] === 'Flex Points') {
			// Add space before AM or PM so Date.parse understands it.
			var dateString = row[1]
				.replace(/\s/g, ' ')
				.replace(/\B[AP]M/, ' $&');
			var date = Date.parse(dateString);
			
			var minusMatch = row[3].match(/[\-\u2013]/); // look for a minus sign (hyphen or en-dash)
			var spentMatch = row[3].match(/[\d\.]+/);
			var amountChange = spentMatch ? Number(spentMatch[0]) : null;
			
			if (
				!isNaN(date) &&
				amountChange !== null &&
				date > Flex.semester.start
				&& date < Flex.NOW // debug
			) {
				// account for positive/negative changes
				if (minusMatch && minusMatch.index < spentMatch.index) {
					amountChange = -amountChange;
				}
				
				Flex.amountRemaining = Math.round((Flex.amountRemaining + amountChange) * 100) / 100;
				flexData.push([date, Flex.amountRemaining]);
			}
		}
	});
	
	Flex.processData(flexData);
}

//// Event Listeners ////

//document.addEventListener('DOMContentLoaded', Flex.parseRawData);
document.addEventListener('DOMContentLoaded', Flex.loadDemoData);

document.getElementById('demo-link').addEventListener('click', Flex.loadDemoData);

document.getElementById('submit').addEventListener('click', Flex.parseRawData);
