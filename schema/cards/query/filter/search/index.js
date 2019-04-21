const _ = require("lodash/fp");

const search = args => cards => {
	if (!args.filter) {
		return cards;
	}

	const createSearchFilter = key =>
		_.filter(
			_.flow(
				_.get(key),
				_.lowerCase,
				_.includes(
					args.filter[key] ? args.filter[key].toLowerCase() : "",
				),
			),
		);

	const doSearch = _.compose(
		["name", "text", "flavor"].map(createSearchFilter),
	);

	return doSearch(cards);
};

module.exports = search;
