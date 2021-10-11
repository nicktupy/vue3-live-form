import type { RowType } from '../types/Types';

const evaluateConditionalDisplay = (rowConfig: RowType, model: any) => {
	const criteria = rowConfig.criteria;
	if (criteria) {
		const targetKey = criteria[0];
		const operation = criteria[1];
		const value = criteria[2];

		let bool = false;
		switch (operation) {
			case '!=':
				bool = model[targetKey] !== value;
				break;
			case '==':
				bool = model[targetKey] === value;
				break;
		}
		return bool;
	} else {
		return true;
	}
};

export default evaluateConditionalDisplay;
