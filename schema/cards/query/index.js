const _ = require("lodash/fp");
const sort = require("./sort");
const search = require("./filter/search");
const quantity = require("./filter/quantity");
const filterByEnum = require("./filter/enum");

const query = (cards, args) => {
	const withArgs = [search, filterByEnum, quantity, sort].map(fn => fn(args));

	const doQuery = _.pipe(withArgs);

	return doQuery(cards);
};

module.exports = query;
