const _ = require("lodash/fp");
const sort = require("./sort");
const match = require("./filter/match");
const quantity = require("./filter/quantity");
const filterByEnum = require("./filter/enum");
const paginate = require("./paginate");

const query = (cards, args) => {
	const withArgs = [match, filterByEnum, quantity, sort, paginate].map(fn =>
		fn(args),
	);

	const doQuery = _.pipe(withArgs);

	return doQuery(cards);
};

module.exports = query;
