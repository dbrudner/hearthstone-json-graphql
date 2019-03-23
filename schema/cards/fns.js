const _ = require("lodash/fp");

const search = (cards, args) => {
	const createSearchFilter = key =>
		_.filter(
			_.flow(
				_.get(key),
				_.includes(args[key] || ""),
			),
		);

	const doSearch = _.compose(
		createSearchFilter("name"),
		createSearchFilter("text"),
	);
	return doSearch(cards);
};

module.exports = { search };
