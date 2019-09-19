<template>
	<highcharts :options="chartOptions" />
</template>

<script>
import Highcharts from 'highcharts';
import annotationsInit from 'highcharts/modules/annotations';
import { Chart } from 'highcharts-vue';

annotationsInit(Highcharts);

import {
	interpolateLine,
	interpolatePoint,
} from '../js/utils';

export default {
	components: {
		highcharts: Chart,
	},

	props: {
		chartData: {
			type: Array,
			default: null,
		},
		now: {
			type: Number,
			required: true,
		},
		processedView: {
			validator (value) {
				return [null, 'quick', 'parse', 'demo'].includes(value);
			},
			required: true,
		},
		rawDataComplete: Boolean,
		remainingBalance: {
			type: Number,
			default: null,
		},
		remainingBalanceIdeal: {
			type: Number,
			required: true,
		},
		semester: {
			type: Object,
			required: true,
		},
		startBalance: {
			type: Number,
			required: true,
		},
	},

	data () {
		return {
			staticOptions: {
				chart: {
					type: 'line',
					styledMode: true,
					spacingLeft: 0,
					spacingRight: 0,
					events: {
						render () {
							console.log(this.get('idealNow'), this.get('actualNow'), this.get('actualNowAnnotation'));
							console.log(this.annotations[0]);
						},
						// load: this.processedView !== 'demo'
						// 	? function () {
						// 		const pointIdeal = this.get('ideal').data[currentIdealBalanceIndex];
						// 		const pointActual = this.get('actual')
						// 			&& this.get('actual').data[currentIdealBalanceIndex];

						// 		this.tooltip.refresh(
						// 			pointActual ? [pointIdeal, pointActual] : [pointIdeal]
						// 		);
						// 	}
						// 	: undefined,
						// render: this.showTooltips,
					},
				},
				plotOptions: {
					series: {
						keys: ['x', 'y', 'id', 'marker.enabled'],
						marker: {
							// enabled: false,
						},
					},
				},
				time: {
					useUTC: false,
				},
				tooltip: {
					split: true,
					valueDecimals: 2,
					valuePrefix: '$',
					xDateFormat: '%a, %B %e, %Y, %l:%M %p',
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
			},
		};
	},

	computed: {
		chartOptions () {
			return {
				...this.staticOptions,
				annotations: [
					{
						labels: [
							{
								point: 'idealNow',
								text: 'Current ideal balance: ${y:.2f}',
							},
							!this.remainingBalance ? null : {
								// point: {
								// 	xAxis: 0,
								// 	yAxis: 0,
								// 	x: this.now,
								// 	y: this.remainingBalance,
								// },
								point: 'actualNow',
								text: 'Current actual balance: ${y:.2f}',
								id: 'actualNowAnnotation',
							},
						],
						labelOptions: {
							align: 'right',
							shape: 'connector',
						},
					},
				],
				series: this.series,
				title: {
					// Easter egg :)
					text: this.remainingBalance === 246.01 ? 'My name is Jean Valjean' : undefined,
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
			};
		},

		dataActual () {
			const data = this.processedView === 'quick' ? this.dataQuick : this.chartData;

			if (data) {
				data[this.findCurrentIndex(data)].push('actualNow', true);
				// data[this.findCurrentIndex(data)] = {
				// 	x: this.now,
				// 	y: this.remainingBalance,
				// 	id: 'actualNow',
				// 	marker: {
				// 		enabled: true,
				// 	},
				// };
				console.log(data[this.findCurrentIndex(data)], data);
			}

			return data;
		},

		dataEstimated () {
			return (this.processedView === 'parse' && !this.rawDataComplete)
				? interpolateLine(
					this.semester.start,
					this.dataActual[0][0],
					this.startBalance,
					this.dataActual[0][1],
				)
				: [];
		},

		dataIdeal () {
			const idealBalanceData = this.dataActual
				? [
					...this.dataEstimated, ...this.dataActual, ...this.dataProjected,
				].map(function ([date]) {
					return [
						date,
						// TODO: work in `getIdealBalanceAtDate`
						interpolatePoint(date, this.semester.start, this.semester.end, this.startBalance, 0),
					];
				}, this)
				: interpolateLine(
					this.semester.start,
					this.semester.end,
					this.startBalance,
					0,
				);

			// const currentIdealBalanceIndex = this.findCurrentIndex(idealBalanceData)l

			// console.log(this.findCurrentIndex(idealBalanceData));
			idealBalanceData.splice(
				this.findCurrentIndex(idealBalanceData),
				0,
				[this.now, this.remainingBalanceIdeal, 'idealNow', true]
				// {
				// 	x: this.now,
				// 	y: this.remainingBalanceIdeal,
				// 	id: 'idealNow',
				// 	marker: {
				// 		enabled: true,
				// 	},
				// }
			);

			return idealBalanceData;
		},

		dataProjected () {
			return interpolateLine(
				this.now,
				Math.max(this.semester.end, this.now),
				this.remainingBalance,
				0
			);
		},

		dataQuick () {
			return interpolateLine(
				Math.min(this.semester.start, this.now),
				this.now,
				this.startBalance,
				this.remainingBalance,
			);
		},

		series () {
			const series = [
				{
					name: 'Ideal balance',
					colorIndex: 1,
					data: this.dataIdeal,
					id: 'ideal',
				},
			];

			if (this.dataActual) {
				series.push({
					name: 'Estimated balance',
					colorIndex: 0,
					className: 'line-dash',
					data: this.dataEstimated,
					id: 'estimated',
					linkedTo: 'actual',
				}, {
					name: 'Actual balance',
					colorIndex: 0,
					step: (this.processedView !== 'quick') ? 'left' : null,
					data: this.dataActual,
					id: 'actual',
				}, {
					name: 'Projected balance',
					colorIndex: 0,
					className: 'line-dash',
					data: this.dataProjected,
					id: 'projected',
					linkedTo: ':previous',
				});
			}

			return series;
		},
	},

	methods: {
		findCurrentIndex (data) {
			// console.log({data});
			const currentIndex = data.findIndex(function ([date]) {
				return date >= this.now;
			}, this);

			return currentIndex !== -1 ? currentIndex : data.length;
		},

		showTooltips ({ target: chart }) {
			// 		const pointIdeal = this.get('ideal').data[currentIdealBalanceIndex];
			// 		const pointActual = this.get('actual')
			// 			&& this.get('actual').data[currentIdealBalanceIndex];

			// 		this.tooltip.refresh(
			// 			pointActual ? [pointIdeal, pointActual] : [pointIdeal]
			// 		);
			console.log(chart);

			const seriesIdeal = chart.get('ideal').data;
			const seriesActual = chart.get('actual') && chart.get('actual').data;
			console.log({seriesIdeal, seriesActual});

			const pointIdeal = seriesIdeal[this.findCurrentIndex(this.dataIdeal)];
			const pointActual = seriesActual && seriesActual[this.findCurrentIndex(this.dataActual)];
			console.log({pointIdeal, pointActual});

			// chart.tooltip.refresh(
			// 	pointActual ? [pointIdeal, pointActual] : [pointIdeal]
			// );
		},
	},
};
</script>
