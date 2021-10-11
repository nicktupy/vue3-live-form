<template>
	<select v-model="modelValue[config.field!]" @change="emitChange">
		<!-- Display options if config.options is a string referring to a top level array -->
		<template v-if="typeof config.options === 'string'">
			<template v-for="(option, index) in modelValue[config.options]" :key="`option-${index}`">
				<option :value="config.optionValue ? option[config.optionValue] : option" :id="`option-${index}`">
					{{ option[config.optionLabel!] ?? option }}
				</option>
			</template>
		</template>
		<!-- Display options if config.options is an array of options -->
		<template v-if="typeof config.options !== 'string' && config.options!.length > 0">
			<template v-for="(option, index) in config.options" :key="`option-${index}`">
				<option :value="config.optionValue ? option[config.optionValue] : option" :id="`option-${index}`">
					{{ option[config.optionLabel!] ?? option }}
				</option>
			</template>
		</template>
	</select>
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
