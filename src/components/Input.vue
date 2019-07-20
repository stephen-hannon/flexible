<template>
	<form @submit.prevent="onSubmit">
		$<input
			type="number"
			class="appearance-textfield hide-steppers"
			required
			v-bind="$attrs"
			v-model.lazy.number="_value"
		/>
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
			validator (value) {
				return !isNaN(parseFloat(value));
			},
		},
	},

	data () {
		return {
			_value: null,
		};
	},

	watch: {
		value: {
			immediate: true,
			handler (val) {
				this._value = val;
			},
		},
	},

	methods: {
		/**
		 * @param {Event}
		 */
		onSubmit ({ target }) {
			this.$emit('submit', this._value);
			this._value = null;
			if (target && target[0] && target[0].blur) {
				target[0].blur();
			}
		},
	},
};
</script>
