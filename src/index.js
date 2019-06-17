'use strict';

import Vue from 'vue';
import Highcharts from 'highcharts';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faArrowRight, faRedo, faTimes, faBars, faUser, faCommentAlt } from '@fortawesome/free-solid-svg-icons';

import * as utils from './utils';
import sampleData from './sample-data.json';

library.add(faGithub, faArrowLeft, faArrowRight, faRedo, faTimes, faBars, faUser, faCommentAlt);
dom.watch();

const Flex = {};

Flex.demoText = sampleData.data;

Vue.prototype.$utils = utils;

const vm = new Vue({
	el: '#flexible',

	data: {
		currentIdealBalanceIndex: null,
		debugNow: null,
		manualDates: {
			start: null,
			end: null,
		},
		quickBalance: null,
		now: Date.now(),
		parsedRawData: null,
		processedView: false, // if we're displaying a semester other than the current one
		rawData: '',
		rawDataComplete: true,
		rawDataError: false,
		remainingBalance: null,
		showMessages: {
			rawDataComplete: false,
		},
		startBalance: 500,
		tabOption: 'windows', // currently selected tab
		tabOptions: {
			macos: 'macOS',
			mobile: 'Mobile',
			windows: 'Windows',
		},
	},

	computed: {
		inSemester: function () {
			return (this.now > this.semester.start - this.$utils.softSemesterLimit);
		},
		inSemesterCurrent: function () {
			return (this.getNow() > this.semesterCurrent.start - this.$utils.softSemesterLimit);
		},
		rates: function () {
			if (!this.semester) {
				return {
					past: null,
					future: null,
				};
			}

			const DAYS_PER_WEEK = 7;
			const remainingBalance = this.remainingBalance || this.remainingBalanceIdeal;

			const msPast = Math.min(this.now, this.semester.end) - this.semester.start;
			const daysPast = msPast / this.$utils.MS_PER_DAY;
			const weeksPast = daysPast / DAYS_PER_WEEK;

			const msFuture = this.semester.end - Math.max(this.now, this.semester.start);
			const daysFuture = msFuture / this.$utils.MS_PER_DAY;
			const weeksFuture = daysFuture / DAYS_PER_WEEK;

			return {
				past: {
					total: this.spentBalance,
					perDay: this.spentBalance / daysPast || 0,
					perWeek: this.spentBalance / weeksPast || 0,
				},
				future: {
					total: remainingBalance,
					perDay: remainingBalance / daysFuture || 0,
					perWeek: remainingBalance / weeksFuture || 0,
				},
			};
		},
		remainingBalanceIdeal: function () {
			return this.getIdealBalanceAtDate(this.now);
		},
		remainingBalanceIdealCurrent: function () {
			return this.getIdealBalanceAtDate(this.getNow(), this.semesterCurrent);
		},
		remainingBalanceRelative: function () {
			return this.remainingBalance - this.remainingBalanceIdeal || 0;
		},
		semester: function () {
			const semester = this.$utils.findSemester(this.now);
			if (this.manualDates.start) {
				semester.start += this.manualDates.start;
			}
			if (this.manualDates.end) {
				semester.end += this.manualDates.end;
			}
			return semester;
		},
		semesterCurrent: function () {
			const semester = this.$utils.findSemester(this.getNow());
			return (semester.year === this.semester.year) ? this.semester : semester;
		},
		spentBalance: function () {
			return this.$utils.addCurrency(this.startBalance, -(this.remainingBalance || this.remainingBalanceIdeal));
		},
	},


	watch: {
		now: function () {
			this.manualDates = {
				start: null,
				end: null,
			};
		},

		rawData: function (rawData) {
			if (rawData) {
				// quick sanity check
				if (rawData.indexOf('Flex Points') === -1) {
					this.rawDataError = true;
				} else {
					Flex.parseRawData(rawData);
				}

				this.rawData = null;
			}
		},

		quickBalance: function () {
			if (this.quickBalance !== null) {
				this.rawDataComplete = true;
				this.now = this.getNow();

				this.remainingBalance = this.quickBalance;
				const balanceData = [
					[this.semester.start, this.startBalance],
					[this.now, this.remainingBalance],
				];

				this.processedView = true;
				this.makeChart(balanceData);
				this.quickBalance = null;
			}
		},

		startBalance: function (startBalance, oldStartBalance) {
			if (startBalance !== oldStartBalance) {
				this.makeChart();
			}
		},
	},

	mounted: function () {
		// Basic user agent sniffing to determine which tab to show initially.
		// It's not perfect, but it's just a convenience.
		const userAgent = window.navigator.userAgent;
		if (/iPhone|iPad|iPod|Android/.test(userAgent)) {
			this.tabOption = 'mobile';
		} else if (userAgent.indexOf('Mac') !== -1) {
			this.tabOption = 'macos';
		}
		// else stays as 'windows'

		// Allow overriding the current date by URL hash. No public interface
		// since it could break things.
		const nowDate = window.location.hash.match(/^#now=(\d{4})-(\d{2})-(\d{2})$/);
		if (nowDate !== null) {
			const [, year, month, day] = nowDate.map(e => Number(e));
			const now = new Date(year, month - 1, day);
			this.debugNow = now.getTime();
			this.now = this.debugNow;

			// eslint-disable-next-line no-console
			console.log('Setting debug date to', now);
		}

		this.makeChart();
	},

	methods: {
		/**
		 * Adjusts `parsedRawData` so its last balance value is `remainingBalance`
		 * @param {number} remainingBalance
		 * @returns {void}
		 */
		adjustIncompleteData: function (remainingBalance) {
			remainingBalance = Number(remainingBalance);

			if (!this.rawDataComplete && !isNaN(remainingBalance)) {
				this.showMessages.rawDataComplete = false;
				this.remainingBalance = remainingBalance;
				this.adjustParsedRawData(remainingBalance - this.parsedRawData[this.parsedRawData.length - 1][1]);
				this.makeChart(this.parsedRawData);
			}
		},

		/**
		 * Adjusts `parsedRawData` by adding `adjustmentAmount` to each balance
		 * @param {number} adjustmentAmount
		 * @returns {void}
		 */
		adjustParsedRawData: function (adjustmentAmount) {
			if (!adjustmentAmount)
				return;

			this.parsedRawData = this.parsedRawData.map(function (original) {
				original[1] = this.$utils.addCurrency(original[1], adjustmentAmount);
				return original;
			}, this);
		},

		/**
		 * Modifies the semester start or end date by adding or subtracting days
		 * @param {'start'|'end'} startOrEnd - whether the start or end date should be changed
		 * @param {number} deltaDay - how many days to add (can be negative)
		 * @param {boolean} validateOnly - if the function should only validate if the change can be made
		 * @returns {boolean|void} whether the change can be made, if `validateOnly` is `true`
		 */
		changeSemesterDate: function (startOrEnd, deltaDay, validateOnly) {
			const deltaMs = deltaDay * this.$utils.MS_PER_DAY;
			if (startOrEnd === 'start') {
				if (this.semester.start + deltaMs < this.semester.end) {
					if (validateOnly) return true;
					this.manualDates.start += deltaMs;
				}
			} else if (startOrEnd === 'end') {
				if (this.semester.end + deltaMs > this.semester.start) {
					if (validateOnly) return true;
					this.manualDates.end += deltaMs;
				}
			}
			if (validateOnly) return false;
		},

		/**
		 * @returns {string} A representation of the command or control key,
		 * depending on whether the macOS tab is selected or not
		 */
		ctrlOrCmd: function () {
			return (this.tabOption === 'macos') ? '\u2318 Cmd' : 'Ctrl';
		},

		/**
		 * Finds the last semester whose end date is before `date`
		 * @param {number} date - the current date, in milliseconds since the epoch
		 * @returns {object} the semester of `date`
		 */
		findSemester: function (date) {
			return this.semesters.reduce(function(prevSemester, curSemester) {
				// Find the last semester where we haven't reached the end
				return (date < curSemester.end + utils.softSemesterLimit) ? curSemester : prevSemester;
			});
		},

		getIdealBalanceAtDate: function (date, semester = this.semester) {
			date = Math.max(semester.start, Math.min(date, semester.end));
			const msOverall = semester.end - semester.start;
			const msFuture = semester.end - date;

			return (msFuture / msOverall) * this.startBalance;
		},

		getIdealBalanceData: function () {
			const idealBalanceData = [];

			this.currentIdealBalanceIndex = null;

			for (let date = this.semester.start; date < this.semester.end; date += this.$utils.MS_PER_DAY) {
				idealBalanceData.push([date, this.getIdealBalanceAtDate(date)]);

				if (this.now >= date && this.now < date + this.$utils.MS_PER_DAY) {
					const MS_PER_MINUTE = 1000 * 60;
					const nowNearestMinute = Math.floor(this.now / MS_PER_MINUTE) * MS_PER_MINUTE;
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

		getNow: function () {
			return this.debugNow || Date.now();
		},

		/**
		 * @param {[number, number][]} [data] - array of points of the format [timestamp, amount]
		 * @returns {Highcharts.ChartObject}
		 */
		makeChart: function (data) {
			const idealBalanceData = [
				[this.semester.start, this.startBalance],
				[this.semester.end, 0],
			];
			if (this.inSemester) {
				idealBalanceData.splice(1, 0, [this.now, this.remainingBalanceIdeal]);
			}

			const series = [
				{
					name: 'Ideal balance',
					color: 'red',
					lineWidth: 1,
					enableMouseTracking: !data,
					data: this.getIdealBalanceData()
				},
			];

			if (data) {
				series.push({
					name: 'Actual balance',
					color: 'steelblue',
					step: (this.quickBalance === null) ? 'left' : null,
					data: data,
					tooltip: {
						pointFormatter: function () {
							return `<span style="color:${ this.color }">\u25CF</span> ${ this.series.name }: <b>$${ this.y.toFixed(2) }</b><br/>` +
								`<span style="color:red">\u25CF</span> Ideal balance: <b>$${ vm.getIdealBalanceAtDate(this.x).toFixed(2) }</b><br/>`;
						},
					},
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
							[this.semester.end, 0],
						]
					});
				}
			}

			const _this = this;

			return Highcharts.chart('chart', {
				chart: {
					type: 'line',
					events: {
						load: function () {
							const point = this.series[0].data[_this.currentIdealBalanceIndex];
							this.tooltip.refresh(point);
						},
					},
				},
				title: {
					text: undefined,
				},
				xAxis: {
					crosshair: {
						snap: false,
					},
					labels: {
						format: '{value:%b %e}',
					},
					type: 'datetime',
				},
				yAxis: {
					crosshair: {
						snap: false,
					},
					max: this.startBalance,
					title: {
						text: 'Flex Points',
					},
					labels: {
						format: '${value}',
					},
				},
				plotOptions: {
					line: {
						marker: {
							enabled: false,
						},
					},
				},
				series: series,
				tooltip: {
					// split: true,
					dateTimeLabelFormats: {
						day: '%a, %B %e',
						minute: '%a, %B %e, %l:%M %p',
					},
					valueDecimals: 2,
					valuePrefix: '$',
				},
				time: {
					useUTC: false,
				},
			});
		},

		useDemo: function () {
			// DEBUG
			// const now = Date.parse('2018-04-01');
			// Flex.demoText = Flex.demoText.filter(function (entry) {
			// 	return entry[0] < now;
			// }, this);

			this.rawDataComplete = true;
			this.startBalance = Flex.demoText[0][1];
			this.remainingBalance = Flex.demoText[Flex.demoText.length - 1][1];
			this.now = Flex.demoText[Flex.demoText.length - 1][0];

			this.processedView = true;
			this.makeChart(Flex.demoText);
		},
	},
});


// How we parse:
// Iterate through the table data (which is in reverse chronological order)
// Prepend each flex point change to the beginning of the data list, assuming for now that it ends at zero.
// Stop iterating when we reach a row that is the addition of the full balance (i.e., the semester start).
// If this is never reached (i.e., some data is missing), ask them for their current balance and attempt to
// display the data that way.
Flex.parseRawData = function (rawData) {
	vm.now = vm.getNow(); // in case the page has been loaded for a long time

	const data = rawData.split('\n').map(row => row.split('\t'));

	vm.parsedRawData = [];
	let previousChange = 0;
	vm.rawDataComplete = false;

	for(let i = 0; i < data.length && !vm.rawDataComplete; i++) {
		const row = data[i];

		if (row.length >= 4 && row[0] === 'Flex Points') {
			// TODO: use a library to parse the date dependably
			const dateString = row[1]
				.replace(/\s/g, ' ')
				.replace(/\B[AP]M/, ' $&'); // Add space before AM or PM so Date.parse understands it.
			const date = Date.parse(dateString);

			const minusMatch = row[3].match(/[-\u2013]/); // look for a minus sign (hyphen or en-dash)
			const spentMatch = row[3].match(/[\d.]+/);
			let amountChange = spentMatch ? +spentMatch[0] : null;

			if (
				!isNaN(date) &&
				amountChange !== null
				// && date < vm.now // debug
			) {
				// account for positive/negative changes
				if (minusMatch && minusMatch.index < spentMatch.index) {
					amountChange = -amountChange;
				}

				const firstAmount = vm.parsedRawData[0] ? utils.addCurrency(vm.parsedRawData[0][1], -previousChange) : 0;
				previousChange = amountChange;

				vm.parsedRawData.unshift([date, firstAmount]);

				if (amountChange === vm.startBalance) {
					vm.rawDataComplete = true;
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

	// If the data goes all the way back to the beginning, we know the current
	// balance, so we adjust the remaining balance from 0
	if (vm.rawDataComplete) {
		vm.adjustParsedRawData(vm.startBalance - vm.parsedRawData[0][1]);
	} else {
		vm.showMessages.rawDataComplete = true;
	}

	vm.remainingBalance = vm.parsedRawData[vm.parsedRawData.length - 1][1];
	vm.now = vm.parsedRawData[vm.parsedRawData.length - 1][0];

	if (vm.remainingBalance !== 0) {
		vm.parsedRawData.push([vm.now, vm.remainingBalance]);
	}

	vm.processedView = true;
	vm.makeChart(vm.parsedRawData);
};
