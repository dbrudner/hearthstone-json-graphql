const _ = require("lodash/fp");

const match = args => cards => {
	if (!args.filter) {
		return cards;
	}

	const createMatchFilter = key =>
		_.filter(
			_.flow(
				_.get(key),
				_.lowerCase,
				_.includes(
					args.filter[key] ? args.filter[key].toLowerCase() : "",
				),
			),
		);

	const doMatch = _.compose(
		["name", "text", "flavor"].map(createMatchFilter),
	);

	return doMatch(cards);
};

module.exports = match;
