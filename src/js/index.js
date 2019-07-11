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

import * as filters from './filters';
import * as utils from './utils';
import { parseData } from './parse';
import sampleData from '../assets/sample-data.json';
import styles from '../scss/_variables.scss';

library.add(
	faGithub,
	faArrowLeft, faArrowRight, faRedo, faTimes, faBars, faUser, faCommentAlt,
);
dom.watch();

Vue.config.productionTip = false;

const vm = new Vue({
	el: '#flexible',

	filters: {
		currency: filters.formatCurrency,
		currencySafe: filters.formatCurrencySafe,
		date: filters.formatDate,
	},

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
			return (this.now > this.semester.start - utils.softSemesterLimit);
		},
		inSemesterCurrent: function () {
			return (this.getNow() > this.semesterCurrent.start - utils.softSemesterLimit);
		},
		rates: function () {
			if (!this.semester) {
				return {
					past: null,
					future: null,
				};
			}

			const DAYS_PER_WEEK = 7;

			const msPast = Math.min(this.now, this.semester.end) - this.semester.start;
			const daysPast = msPast / utils.MS_PER_DAY;
			const weeksPast = daysPast / DAYS_PER_WEEK;

			const msFuture = this.semester.end - Math.max(this.now, this.semester.start);
			const daysFuture = msFuture / utils.MS_PER_DAY;
			const weeksFuture = daysFuture / DAYS_PER_WEEK;

			return {
				past: {
					total: this.spentBalance,
					perDay: this.spentBalance / daysPast || 0,
					perWeek: this.spentBalance / weeksPast || 0,
				},
				future: {
					total: this.remainingBalanceSafe,
					perDay: this.remainingBalanceSafe / daysFuture || 0,
					perWeek: this.remainingBalanceSafe / weeksFuture || 0,
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
				this.parsedRawData = utils.adjustBalances(
					this.parsedRawData,
					remainingBalance - this.parsedRawData[this.parsedRawData.length - 1][1]
				);
				this.makeChart(this.parsedRawData);
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
		 * @returns {string} A representation of the command or control key,
		 * depending on whether the macOS tab is selected or not
		 */
		ctrlOrCmd: function () {
			return (this.tabOption === 'macos') ? '\u2318 Cmd' : 'Ctrl';
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
			date = Math.max(semester.start, Math.min(date, semester.end));
			const msOverall = semester.end - semester.start;
			const msFuture = semester.end - date;

			return (msFuture / msOverall) * this.startBalance;
		},

		getIdealBalanceData: function (timeStep = utils.MS_PER_DAY) {
			const idealBalanceData = [];

			for (let date = this.semester.start; date < this.semester.end; date += timeStep) {
				idealBalanceData.push([date, this.getIdealBalanceAtDate(date)]);
			}

			// always include the last data point ($0)
			idealBalanceData.push([this.semester.end, 0]);

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
			// If data was provided, the ideal series won't have mouse tracking, so we only have to
			// graph the beginning and end of the semester. Input Infinity to ensure
			// getIdealBalanceData's for loop only runs once.
			const idealBalanceData = this.getIdealBalanceData(data ? Infinity : undefined);

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
					color: styles.colorGraphSecondary,
					// lineWidth: 1,
					enableMouseTracking: !data,
					data: idealBalanceData,
					id: 'ideal',
				},
			];

			if (data) {
				series.push({
					name: 'Actual balance',
					color: styles.colorGraphPrimary,
					step: (this.quickBalance === null) ? 'left' : null,
					data: data,
					id: 'actual',
					tooltip: {
						pointFormatter: function () {
							return `<span style="color:${ this.color }">\u25CF</span>` +
								`${ this.series.name }: <b>${ filters.formatCurrency(this.y) }</b><br/>` +
								`<span style="color:${ styles.colorGraphSecondary }">\u25CF</span>` +
								`Ideal balance: <b>${ filters.formatCurrency(vm.getIdealBalanceAtDate(this.x)) }</b><br/>`;
						},
					},
				});

				// If we're in the middle of the semester, add a dashed line with projected usage
				if (this.inSemester && this.remainingBalance !== 0) {
					series.push({
						name: 'Projected balance',
						color: styles.colorGraphPrimary,
						dashStyle: 'shortdash',
						enableMouseTracking: false,
						data: [
							[this.now, this.remainingBalance],
							[this.semester.end, 0],
						],
						id: 'projected',
						linkedTo: ':previous',
					});
				}
			}

			return Highcharts.chart('chart', {
				chart: {
					type: 'line',
					events: {
						load: function () {
							const point = this.get('ideal').data[currentIdealBalanceIndex];
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

			const { parsedRawData, rawDataComplete } = parseData(rawData, this.startBalance);
			this.parsedRawData = parsedRawData;
			this.rawDataComplete = rawDataComplete;

			// Check for invalid data supplied
			if (this.parsedRawData.length === 0) {
				this.rawDataError = true;
				return;
			}

			this.rawDataError = false;

			// If the data goes all the way back to the beginning, we know the current
			// balance, so we adjust the remaining balance from 0
			if (this.rawDataComplete) {
				this.parsedRawData = utils.adjustBalances(
					this.parsedRawData,
					this.startBalance - this.parsedRawData[0][1],
				);
			} else {
				this.showMessages.rawDataComplete = true;
			}

			let lastDate;
			[lastDate, this.remainingBalance] = this.parsedRawData[this.parsedRawData.length - 1];

			const dataSemester = utils.findSemester(lastDate);
			// If the data was from a different (previous) semester, update `now` to match this semester.
			if (dataSemester.year !== this.semester.year) {
				this.now = lastDate;
			} else {
				// `else` because we don't need a duplicate point if `this.now` is already `lastDate`.
				this.parsedRawData.push([this.now, this.remainingBalance]);
			}

			this.processedView = true;
			this.makeChart(this.parsedRawData);
		},

		useDemo: function () {
			// DEBUG
			// sampleData = sampleData.filter(function (entry) {
			// 	return entry[0] < this.now;
			// }, this);

			this.rawDataComplete = true;
			this.startBalance = sampleData[0][1];
			[this.now, this.remainingBalance] = sampleData[sampleData.length - 1];

			this.processedView = true;
			this.makeChart(sampleData);
		},
	},
});
