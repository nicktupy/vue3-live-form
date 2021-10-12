<template v-if="mounted">
	<div class="sf-nested-rows">
		<table>
			<tr>
				<td class="sf-nested-column" v-for="(column, columnIndex) in config.columns" :key="`column-label-${columnIndex}`">
					{{ column.label ?? column.field }}
				</td>
			</tr>
			<tr v-for="(row, rowIndex) in modelValue[config.field!]" :key="`row-${rowIndex}`" class="sf-nested-row">
				<td v-for="(column, columnIndex) in config.columns" :key="`column-${columnIndex}`" class="sf-nested-column">
					<component
						:is="getComponent(column.type)"
						v-model="nestedModel[rowIndex]"
						:config="column"
						:readonly="column.readonly ?? false"
						@change="emitChange"
						v-if="evaluateConditionalDisplay(column, nestedModel[rowIndex])"
					/>
				</td>
				<td class="sf-nested-delete" @click="removeNestedItem(rowIndex)" tabindex="0" />
			</tr>
		</table>
		<button class="sf-nested-row add-row" tabindex="0" @click="insertNestedItem">Add Entry</button>
	</div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, onMounted, PropType } from '@vue/runtime-core';
import { ref } from '@vue/reactivity';
import type { RowType } from '../../types/Types';
import { getComponent } from '../componentMap';
import evaluateConditionalDisplay from '../../helpers/evaluateConditionalDisplay';

const emit = defineEmits(['change']);
let emitChange = () => {
	emit('change');
};

const props = defineProps({
	modelValue: {
		type: Object,
		required: true,
	},
	config: {
		type: Object as PropType<RowType>,
		required: true,
	},
});

// Prevent component from rendering until everything is mounted to prevent error resolving getComponent()
let mounted = ref(false);
onMounted(() => {
	mounted.value = true;
});

let columnSchema = JSON.parse(JSON.stringify(props.config.columns));
let nestedModel = ref(props.modelValue[props.config.field]);

let insertNestedItem = () => {
	// Create a new empty object with keys for each field defined in the schema's columns
	let newObject: any = {};
	for (const index in columnSchema) {
		// If the current columnSchema entry has a type of 'nested', set the value of
		// the new key to be an array so deeper nested inputs can push to it.
		newObject[columnSchema[index]['field']] = columnSchema[index]['type'] === 'nested' ? [] : null;
	}
	nestedModel.value.push(newObject);
	emit('change');
};

let removeNestedItem = (index: number) => {
	nestedModel.value.splice(index, 1);
	emit('change');
};
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
<style lang="scss" scoped>
@import '../../styles/icons';

.sf-nested-rows {
	display: flex;
	flex-direction: column;
	width: 100%;
	position: relative;

	.sf-nested-row {
		margin: 2px 0;
		justify-content: flex-start;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.6);
		padding: 8px;
		border-radius: 8px;
		font-family: sans-serif;
		font-size: 0.9em;
		position: relative;

		&.add-row {
			justify-content: center;
			cursor: pointer;
			border: none;
			padding: none;
			margin: none;
			font-family: inherit;
			font-weight: bold;
		}

		&.add-row:hover {
			justify-content: center;
			cursor: pointer;
			background-color: #f1f1f1;
		}

		.sf-nested-column {
			margin: 0 6px;
			position: relative;
			input[type='text'],
			input[type='password'],
			input[type='date'],
			input[type='number'],
			textarea,
			select {
				width: 90%;
			}
		}

		.sf-nested-column:last-of-type {
			margin-right: 30px;
		}

		.sf-nested-delete {
			width: 24px;
			height: 100%;
			background-image: $delete;
			right: 6px;
			cursor: pointer;
			opacity: 0.6;
			background-repeat: no-repeat;
			background-position: center;
		}
	}
}
</style>
