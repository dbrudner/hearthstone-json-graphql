const _ = require("lodash/fp");
const sort = require("./sort");
const match = require("./filter/match");
const quantity = require("./filter/quantity");
const filterByEnum = require("./filter/enum");
const search = require("./search");

const query = (cards, args) => {
	const withArgs = [search, match, filterByEnum, quantity, sort].map(fn =>
		fn(args),
	);

	const doQuery = _.pipe(withArgs);

	return doQuery(cards);
};

module.exports = query;
