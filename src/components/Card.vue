<template>
	<div class="card" :class="{'card-wide': wide}">
		<div class="card-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		wide: Boolean,
	},
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables';

.card {
	min-width: 15rem;
	max-width: 30rem;
	margin: 0.8rem;
	background-color: $color-white;
	border: 1px solid #DDD;

	&.card-wide {
		min-width: 20rem;
	}
}

.card-content {
	position: relative;
	margin: 1.6rem;

	p,
	pre {
		margin: 0.8rem 0;
	}
}
</style>

