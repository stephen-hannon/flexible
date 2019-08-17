<template>
	<ul class="stats-list">
		<li>
			<i class="fas fa-calendar-alt" />
			<span class="stat">{{ rates.total | currencySafe }}</span> in total
		</li>
		<li>
			<i class="fas fa-calendar-day" />
			<span class="stat">{{ rates.perDay | currencySafe }}</span> per day
		</li>
		<li>
			<i class="fas fa-calendar-week" />
			<span class="stat">{{ rates.perWeek | currencySafe }}</span> per week
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		rates: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../scss/_variables';

.stats-list {
	list-style-type: none;
	padding: 0;
	margin: 0.8rem 0;

	li {
		padding: 0.4rem 0;
		box-sizing: border-box;
		border-bottom: $size-line solid $color-graph-primary;
	}
}

.stats-list-dashed li {
	border-bottom-style: dashed;
}

.stat {
	font-size: 2rem;
}
</style>
