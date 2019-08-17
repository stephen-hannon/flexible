<template>
	<form @submit.prevent="onSubmit">
		$ <input
			v-model.lazy.number="rawValue"
			type="number"
			class="appearance-textfield hide-steppers"
			required
			v-bind="$attrs"
		>
	</form>
</template>

<script>
export default {
	inheritAttrs: false,

	model: {
		prop: 'value',
		event: 'submit',
	},

	props: {
		value: {
			default: 0,
			validator (value) {
				return !isNaN(parseFloat(value));
			},
		},
	},

	data () {
		return {
			rawValue: null,
		};
	},

	watch: {
		value: {
			immediate: true,
			handler (val) {
				this.rawValue = val;
			},
		},
	},

	methods: {
		/**
		 * @param {Event}
		 */
		onSubmit ({ target }) {
			this.$emit('submit', this.rawValue);
			this.rawValue = null;
			if (target && target[0] && target[0].blur) {
				target[0].blur();
			}
		},
	},
};
</script>
