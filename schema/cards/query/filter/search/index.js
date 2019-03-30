const _ = require("lodash/fp");

const search = args => cards => {
	console.log(args);
	console.log(cards[2]);

	if (!args.filter) {
		return cards;
	}

	const createSearchFilter = key =>
		_.filter(
			_.flow(
				_.get(key),
				_.includes(args.filter[key] ? args.filter[key] : ""),
			),
		);

	const doSearch = _.compose(
		["name", "text", "flavor"].map(createSearchFilter),
	);

	return doSearch(cards);
};

module.exports = search;
