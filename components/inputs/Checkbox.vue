<template>
	<label>
		<input v-model="modelValue[config.field!]" :readonly="config.readonly" type="checkbox" @change="emitChange" />
	</label>
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
label {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
</style>
