const _ = require("lodash/fp");

const quantity = args => cards => {
	if (!args) {
		return cards;
	}

	const comparators = {
		isLessThan: a => b => a > b,
		isGreaterThan: a => b => a < b,
		isEqualTo: a => b => a === b,
	};

	const fn = key => {
		// If there's no argument passed for key, pass through
		if (!args[key]) {
			return _.map(cards => cards);
		}

		const createFilter = filter =>
			args[key][filter]
				? _.filter(
						_.pipe(
							_.get(key),
							comparators[filter](args[key][filter]),
						),
				  )
				: _.map(cards => cards);

		return _.pipe(Object.keys(comparators).map(createFilter));
	};

	const doQuantity = _.pipe(["cost", "health", "attack"].map(fn));

	return doQuantity(cards);
};

module.exports = quantity;
