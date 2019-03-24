const _ = require("lodash/fp");
const sort = require("./sort");
const search = require("./search");

const query = (cards, args) => {
	const fn = _.flow(
		search(args),
		sort(args),
	);

	return fn(cards);
};

module.exports = query;
