const _ = require("lodash/fp");

const search = args => cards => {
	if (!args.where) return cards;

	const createSearchFilter = key =>
		_.filter(
			_.flow(
				_.get(key),
				_.includes(args.where[key] ? args.where[key].matches : ""),
			),
		);

	const doSearch = _.compose(
		["name", "text", "flavor"].map(createSearchFilter),
	);

	return doSearch(cards);
};

module.exports = search;
