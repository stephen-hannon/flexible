<template>
	<div class="form-message" :class="type && 'form-' + type">
		<button
			class="float-right icon-button"
			title="Close message"
			@click="$emit('close')"
		>
			<i class="fas fa-times" title="Close message"></i>
		</button>

		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		type: String,
	},
};
</script>

<style lang="scss" scoped>
@import '../scss/_variables';

.form-message {
	width: 30rem;
	padding: 0.2rem 2rem;
	margin-top: 1rem;
	border-top: 3px solid $color-message;
	background-color: scale-color($color-message, $lightness: 50%);

	p,
	pre {
		margin: 0.5rem 0;
	}
}

.form-error {
	border-top-color: $color-error;
	background-color: scale-color($color-error, $lightness: 50%);
}
</style>

