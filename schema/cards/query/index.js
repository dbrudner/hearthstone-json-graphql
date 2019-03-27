const _ = require("lodash/fp");
const sort = require("./sort");
const search = require("./search");
const quantity = require("./quantity");

const query = (cards, args) => {
	const fn = _.flow(
		search(args),
		sort(args),
		quantity(args.filter),
	);

	return fn(cards);
};

module.exports = query;
