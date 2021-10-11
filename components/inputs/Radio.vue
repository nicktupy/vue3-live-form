<template>
	<!-- Display options if config.options is a string referring to a top level array -->
	<template v-if="typeof config.options === 'string'">
		<div v-for="(option, index) in modelValue[config.options]" :key="`option-${index}`" class="sf-radio-item">
			<input
				:value="config.optionValue ? option[config.optionValue] : option"
				:id="`option-${index}-${config.optionValue}-${config.optionLabel}`"
				v-model="modelValue[config.field!]"
				type="radio"
				@change="emitChange"
			/>
			<label :for="`option-${index}-${config.optionValue}-${config.optionLabel}`">
				{{ option[config.optionLabel!] ?? option }}
			</label>
		</div>
	</template>
	<!-- Display options if config.options is an array of options -->
	<template v-if="typeof config.options !== 'string' && config.options!.length > 0">
		<div v-for="(option, index) in config.options" :key="`option-${index}`" class="sf-radio-item">
			<input
				:value="config.optionValue ? option[config.optionValue] : option"
				:id="`option-${index}-${config.optionValue}-${config.optionLabel}`"
				v-model="modelValue[config.field!]"
				type="radio"
				@change="emitChange"
			/>
			<label :for="`option-${index}-${config.optionValue}-${config.optionLabel}`">
				{{ option[config.optionLabel!] ?? option }}
			</label>
		</div>
	</template>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, PropType } from '@vue/runtime-core';
import type { RowType } from '../../types/Types';

const emit = defineEmits(['change']);
let emitChange = () => {
	emit('change');
};

defineProps({
	modelValue: {
		type: Object,
		required: true,
	},
	config: {
		type: Object as PropType<RowType>,
		required: true,
	},
});
</script>
<style lang="scss" scoped>
.sf-radio-item {
	display: flex;
	flex-direction: column;
	margin: 0 10px;
	cursor: pointer;
	.sf-option-label {
		width: 100%;
		height: 24px;
		color: inherit;
		background-color: #000;
	}
}
</style>
