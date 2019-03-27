const _ = require("lodash/fp");

const search = args => cards => {
	if (!args) {
		return cards;
	}

	const createSearchFilter = key =>
		_.filter(
			_.flow(
				_.get(key),
				_.includes(args[key] ? args[key] : ""),
			),
		);

	const doSearch = _.compose(
		["name", "text", "flavor"].map(createSearchFilter),
	);

	return doSearch(cards);
};

module.exports = search;
