'use strict';

import Vue from 'vue';
import Highcharts from 'highcharts';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
	faGithub,
} from '@fortawesome/free-brands-svg-icons';
import {
	faArrowLeft, faArrowRight, faRedo, faTimes, faBars, faUser, faCommentAlt,
} from '@fortawesome/free-solid-svg-icons';

import InputComponent from '../components/Input.vue';
import MessageComponent from '../components/Message.vue';

import * as filters from './filters';
import * as utils from './utils';
import { parseData } from './parse';
import sampleData from '../assets/sample-data.json';

library.add(
	faGithub,
	faArrowLeft, faArrowRight, faRedo, faTimes, faBars, faUser, faCommentAlt,
);
dom.watch();

Vue.config.productionTip = false;
Vue.component('app-input', InputComponent);
Vue.component('app-message', MessageComponent);

new Vue({
	el: '#flexible',

	filters: {
		currency: filters.formatCurrency,
		currencySafe: filters.formatCurrencySafe,
		date: filters.formatDate,
	},

	data: {
		chartData: null,
		currentIdealBalanceIndex: null,
		debugNow: null,
		loaderShow: true,
		manualDates: {
			start: null,
			end: null,
		},
		now: Date.now(),
		/** @type {'quick' | 'parse' | 'demo'} */
		processedView: null,
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
		/**
		 * @returns {string} A representation of the command or control key,
		 * depending on whether the macOS tab is selected or not
		 */
		ctrlOrCmd: function () {
			return (this.tabOption === 'macos') ? '\u2318 Cmd' : 'Ctrl';
		},
		inSemester: function () {
			return (this.now > this.semester.start - utils.softSemesterLimit);
		},
		inSemesterCurrent: function () {
			return (this.getNow() > this.semesterCurrent.start - utils.softSemesterLimit);
		},
		quickData: function () {
			return utils.interpolateLine(
				Math.min(this.semester.start, this.now),
				this.now,
				this.startBalance,
				this.remainingBalance,
			);
		},
		rates: function () {
			return {
				past: utils.getRates(
					this.semester && Math.min(this.now, this.semester.end) - this.semester.start,
					this.spentBalance,
				),
				future: utils.getRates(
					this.semester && this.semester.end - Math.max(this.now, this.semester.start),
					this.remainingBalanceSafe,
				),
			};
		},
		remainingBalanceIdeal: function () {
			return this.getIdealBalanceAtDate(this.now);
		},
		remainingBalanceIdealCurrent: function () {
			return this.getIdealBalanceAtDate(this.getNow(), this.semesterCurrent);
		},
		remainingBalanceRelative: function () {
			return this.remainingBalanceSafe - this.remainingBalanceIdeal;
		},
		/**
		 * If `remainingBalance` is null (unset), fall back to `remainingBalanceIdeal`
		 */
		remainingBalanceSafe: function () {
			return this.remainingBalance == null ? this.remainingBalanceIdeal : this.remainingBalance;
		},
		semester: function () {
			return this.findSemesterAdjusted(this.now);
		},
		semesterCurrent: function () {
			const semester = utils.findSemester(this.getNow());
			// this.semester may have customized dates, so use that.
			// TODO: Customized dates could make findSemester not line up with this.semester.
			// Move the manualDates logic from `semester` to a reusable method.
			return (semester.year === this.semester.year) ? this.semester : semester;
		},
		spentBalance: function () {
			return utils.addCurrency(
				this.startBalance,
				-this.remainingBalanceSafe
			);
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
					this.parseRawData(rawData);
				}

				this.rawData = null;
			}
		},

		startBalance: function () {
			this.makeChart();
		},
	},

	mounted: function () {
		this.loaderShow = false;

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
		 * Adjusts `chartData` so its last balance value is `remainingBalance`
		 * @param {number} remainingBalance
		 * @returns {void}
		 */
		adjustIncompleteData: function (remainingBalance) {
			remainingBalance = Number(remainingBalance);

			if (
				this.processedView === 'parse'
				&& !this.rawDataComplete
				&& !isNaN(remainingBalance)
			) {
				this.showMessages.rawDataComplete = false;
				this.remainingBalance = remainingBalance;
				this.chartData = utils.adjustBalances(
					this.chartData,
					remainingBalance - this.chartData[this.chartData.length - 1][1]
				);
				this.makeChart();
			}
		},

		/**
		 * Modifies the semester start or end date by adding or subtracting days
		 * @param {'start'|'end'} startOrEnd - whether the start or end date should be changed
		 * @param {number} deltaDay - how many days to add (can be negative)
		 * @param {boolean} validateOnly - if the function should only validate if the change can be made
		 * @returns {boolean|void} whether the change can be made, if `validateOnly` is truthy
		 */
		changeSemesterDate: function (startOrEnd, deltaDay, validateOnly) {
			const deltaMs = deltaDay * utils.MS_PER_DAY;
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
			this.makeChart();
		},

		/**
		 * Extends `utils.findSemester` to take into account `manualDates`
		 * @param {string | number | Date} now
		 */
		findSemesterAdjusted: function (now) {
			const semester = utils.findSemester(now);
			if (this.manualDates.start) {
				semester.start += this.manualDates.start;
			}
			if (this.manualDates.end) {
				semester.end += this.manualDates.end;
			}
			return semester;
		},

		getIdealBalanceAtDate: function (date, semester = this.semester) {
			return utils.interpolatePoint(date, semester.start, semester.end, this.startBalance, 0);
		},

		getNow: function () {
			return this.debugNow || Date.now();
		},

		/**
		 * @returns {Highcharts.ChartObject}
		 */
		makeChart: function () {
			const data = this.processedView === 'quick' ? this.quickData : this.chartData;

			const estimatedData = this.processedView === 'parse' && !this.rawDataComplete
				? utils.interpolateLine(
					this.semester.start,
					data[0][0],
					this.startBalance,
					data[0][1],
				)
				: [];

			const projectedData = utils.interpolateLine(
				this.now,
				Math.max(this.semester.end, this.now),
				this.remainingBalance,
				0
			);

			const idealBalanceData = data
				? [...estimatedData, ...data, ...projectedData].map(function ([date]) {
					return [
						date,
						this.getIdealBalanceAtDate(date),
					];
				}, this)
				: utils.interpolateLine(
					this.semester.start,
					this.semester.end,
					this.startBalance,
					0,
				);

			let currentIdealBalanceIndex = idealBalanceData.findIndex(function (value) {
				return value[0] >= this.now;
			}, this);

			if (currentIdealBalanceIndex === -1) {
				currentIdealBalanceIndex = idealBalanceData.length;
			}

			const MS_PER_MINUTE = 1000 * 60;
			const nowNearestMinute = Math.floor(this.now / MS_PER_MINUTE) * MS_PER_MINUTE;

			idealBalanceData.splice(currentIdealBalanceIndex, 0, {
				x: nowNearestMinute,
				y: this.remainingBalanceIdeal,
				marker: {
					enabled: true,
				},
			});

			const series = [
				{
					name: 'Ideal balance',
					colorIndex: 1,
					data: idealBalanceData,
					id: 'ideal',
				},
			];

			if (data) {
				series.push({
					name: 'Estimated balance',
					colorIndex: 0,
					className: 'line-dash',
					data: estimatedData,
					id: 'estimated',
					linkedTo: 'actual',
				}, {
					name: 'Actual balance',
					colorIndex: 0,
					step: (this.processedView !== 'quick') ? 'left' : null,
					data: data,
					id: 'actual',
				}, {
					name: 'Projected balance',
					colorIndex: 0,
					className: 'line-dash',
					data: projectedData,
					id: 'projected',
					linkedTo: ':previous',
				});
			}

			return Highcharts.chart('chart', {
				chart: {
					type: 'line',
					styledMode: true,
					events: {
						load: this.processedView !== 'demo'
							? function () {
								const pointIdeal = this.get('ideal').data[currentIdealBalanceIndex];
								const pointActual = this.get('actual')
									&& this.get('actual').data[currentIdealBalanceIndex];

								this.tooltip.refresh(
									pointActual ? [pointIdeal, pointActual] : [pointIdeal]
								);
							}
							: undefined,
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
					split: true,
					dateTimeLabelFormats: {
						day: '%a, %B %e, %Y',
						minute: '%a, %B %e, %Y, %l:%M %p',
					},
					valueDecimals: 2,
					valuePrefix: '$',
				},
				time: {
					useUTC: false,
				},
			});
		},

		parseRawData: function (rawData) {
			this.now = this.getNow(); // in case the page has been loaded for a long time

			const {
				parsedRawData,
				rawDataComplete,
				rawDataCompleteEnd,
				newStartBalance
			} = parseData(rawData, this.startBalance);
			this.chartData = parsedRawData;
			this.rawDataComplete = rawDataComplete;

			// Check for invalid data supplied
			if (this.chartData.length === 0) {
				this.rawDataError = true;
				return;
			}

			this.rawDataError = false;

			if (newStartBalance !== undefined) {
				this.startBalance = newStartBalance;
			}

			if (!rawDataCompleteEnd) {
				// If the data goes all the way back to the beginning, we know the current
				// balance, so we adjust the remaining balance from 0
				if (this.rawDataComplete) {
					this.chartData = utils.adjustBalances(
						this.chartData,
						this.startBalance - this.chartData[0][1],
					);
				} else {
					this.showMessages.rawDataComplete = true;
				}
			}

			let lastDate;
			[lastDate, this.remainingBalance] = this.chartData[this.chartData.length - 1];

			const dataSemester = utils.findSemester(lastDate);
			// If the data was from a different (previous) semester, update `now` to match this semester.
			if (dataSemester.year !== this.semester.year) {
				this.now = lastDate;
			} else {
				// `else` because we don't need a duplicate point if `this.now` is already `lastDate`.
				this.chartData.push([this.now, this.remainingBalance]);
			}

			this.processedView = 'parse';
			this.makeChart();
		},

		useDemo: function () {
			// DEBUG
			// sampleData = sampleData.filter(function (entry) {
			// 	return entry[0] < this.now;
			// }, this);

			this.rawDataComplete = true;
			this.chartData = sampleData;
			this.startBalance = sampleData[0][1];
			[this.now, this.remainingBalance] = sampleData[sampleData.length - 1];

			this.processedView = 'demo';
			this.makeChart();
		},

		useQuick: function (quickBalance) {
			this.now = this.getNow();
			this.rawDataComplete = true;

			this.remainingBalance = quickBalance;
			this.processedView = 'quick';
			this.makeChart();
		},
	},
});
