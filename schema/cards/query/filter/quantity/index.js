const _ = require("lodash/fp");

const quantity = args => cards => {
	if (!args.filter) {
		return cards;
	}

	const comparators = {
		isLessThan: _.gt,
		isGreaterThan: _.lt,
		isEqualTo: _.eq,
	};

	const fn = key => {
		// If there's no argument passed for key, pass through
		if (!args.filter[key]) {
			return _.map(cards => cards);
		}

		const createFilter = filter =>
			args.filter[key][filter]
				? _.filter(
						_.pipe(
							_.get(key),
							comparators[filter](args.filter[key][filter]),
						),
				  )
				: _.map(cards => cards);

		return _.pipe(Object.keys(comparators).map(createFilter));
	};

	const doQuantity = _.pipe(["cost", "health", "attack"].map(fn));

	return doQuantity(cards);
};

module.exports = quantity;
