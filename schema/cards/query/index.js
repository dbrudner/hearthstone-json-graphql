const _ = require("lodash/fp");
const sort = require("./sort");
const search = require("./filter/search");
const quantity = require("./filter/quantity");
const filterByCardClass = require("./filter/card-class");

const query = (cards, args) => {
	const fn = _.flow(
		search(args.filter),
		filterByCardClass(args.filter.cardClass),
		quantity(args.filter),
		sort(args.sort)
	);

	return fn(cards);
};

module.exports = query;
