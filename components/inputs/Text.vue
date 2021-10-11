<template>
	<input
		v-model="modelValue[config.field!]"
		:class="{ readonly: config.readonly }"
		:readonly="config.readonly"
		:type="config.type"
		@change="emitChange"
	/>
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
.readonly {
	opacity: 0.6;
}
</style>
