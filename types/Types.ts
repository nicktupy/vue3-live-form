interface SchemaType {
	rows: ReadonlyArray<RowType>;
	labelWidth: string;
}

interface RowType {
	type: 'text' | 'password' | 'checkbox' | 'boolean' | 'textarea' | 'textbox' | 'select' | 'radio' | 'nested' | 'date' | 'number';
	readonly?: boolean;
	field: string;
	options?: string | Array<any>;
	optionLabel?: string;
	optionValue?: string;
	label?: string;
	columns?: Array<RowType>;
	criteria: Array<any>;
}

export { SchemaType, RowType };
