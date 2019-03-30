const _ = require("lodash/fp");
const get = require("lodash/get");

module.exports = function filterByCardClass(args) {
	const cardClass = _.get("filter.cardClass", args);

	if (!cardClass) {
		return _.map(x => x);
	}

	return _.filter(
		_.pipe(
			_.get("cardClass"),
			_.eq(cardClass),
		),
	);
};
