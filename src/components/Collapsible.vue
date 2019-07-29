<template>
	<div
		class="collapsible-container"
		:class="{'collapsible-collapsed': collapsed}"
	>
		<button
			class="collapsible-header"
			@click="$emit('toggle', !collapsed)"
			:title="`Click to ${collapsed ? 'expand' : 'collapse'} section`"
		>
			{{ header }}
			<span class="collapsible-header-icon">
				<i class="fas fa-chevron-up"></i>
			</span>
		</button>

		<transition name="slide">
			<div class="collapsible-content" v-if="!collapsed">
				<slot></slot>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	model: {
		prop: 'collapsed',
		event: 'toggle',
	},

	props: {
		collapsed: Boolean,
		header: String,
	},
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables';
$transition: 0.3s;

.collapsible-container {
	border-top: $size-line solid $color-primary;
	border-bottom: $size-line solid $color-primary;
}

.collapsible-header {
	display: block;
	width: 100%;
	text-align: left;
	font-size: inherit;
	font-weight: 700;
}

.collapsible-header-icon {
	float: right;
	transition: transform $transition;
}

.collapsible-content {
	height: auto;
	transform: scaleY(1);
	transform-origin: top;
	opacity: 1;
	overflow: auto;
	padding: 0 1.6rem;
	transition-property: transform, opacity;
	transition-duration: $transition;
}

.slide-enter,
.slide-leave-to {
	transform: scaleY(0);
	opacity: 0;
}

.collapsible-collapsed {
	.collapsible-header-icon {
		transform: rotate(180deg);
	}
}
</style>

