const _ = require("lodash/fp");
const sort = require("./sort");
const search = require("./filter/search");
const quantity = require("./filter/quantity");
const filterByCardClass = require("./filter/card-class");

const query = (cards, args) => {
	const withArgs = [search, filterByCardClass, quantity].map(fn => fn(args));

	const doQuery = _.pipe(withArgs);

	return doQuery(cards);
};

module.exports = query;
