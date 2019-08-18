<template>
	<span>
		<button
			class="icon-button"
			title="Previous day"
			:disabled="prevDisabled"
			@click="$emit('date-change', -1, startOrEnd)"
		>
			<i title="Previous day" class="fas fa-arrow-left" />
		</button>
		<button
			class="icon-button"
			title="Next day"
			:disabled="nextDisabled"
			@click="$emit('date-change', +1, startOrEnd)"
		>
			<i title="Next day" class="fas fa-arrow-right" />
		</button>
		<button
			v-if="showReset"
			class="icon-button"
			:title="`Reset ${startOrEnd} day`"
			@click="$emit('date-change', 0, startOrEnd)"
		>
			<i :title="`Reset ${startOrEnd} day`" class="fas fa-redo" />
		</button>
	</span>
</template>

<script>
import { MS_PER_DAY } from '../js/utils';

export default {
	props: {
		isStart: Boolean,
		semester: {
			type: Object,
			required: true,
		},
		showReset: Boolean,
	},

	computed: {
		datesAdjacent () {
			return this.semester.end - this.semester.start <= MS_PER_DAY;
		},
		nextDisabled () {
			return this.isStart && this.datesAdjacent;
		},
		prevDisabled () {
			return !this.isStart && this.datesAdjacent;
		},
		startOrEnd () {
			return this.isStart ? 'start' : 'end';
		},
	},
};
</script>
