const _ = require("lodash/fp");
const get = require("lodash/get");

const quantity = args => cards => {
	if (!args.filter) {
		return cards;
	}

	const comparators = {
		isLessThan: _.gt,
		isGreaterThan: _.lt,
		isEqualTo: _.eq,
	};

	const createComparison = cardProperty => {
		const cardPropertyValue = get(args, `filter.${cardProperty}`);

		if (!cardPropertyValue) {
			return x => x;
		}

		const compare = compareFn =>
			cardPropertyValue[compareFn]
				? _.filter(
						_.pipe(
							_.get(cardProperty),
							comparators[compareFn](
								cardPropertyValue[compareFn],
							),
						),
				  )
				: _.map(cards => cards);

		return _.pipe(
			["isLessThan", "isGreaterThan", "isEqualTo"].map(compare),
		);
	};

	const doQuantity = _.pipe(
		["cost", "health", "attack"].map(createComparison),
	);

	return doQuantity(cards);
};

module.exports = quantity;
