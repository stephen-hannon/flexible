<template>
	<form @submit.prevent="onSubmit">
		{{ prefix }}
		<input
			v-model.lazy.number="rawValue"
			type="number"
			class="appearance-textfield hide-steppers"
			required
			v-bind="$attrs"
		>
		{{ suffix }}
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
		prefix: {
			type: String,
			default: '',
		},
		suffix: {
			type: String,
			default: '',
		},
		value: {
			validator (value) {
				return !isNaN(parseFloat(value));
			},
			default: null,
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
