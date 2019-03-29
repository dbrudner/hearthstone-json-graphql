const _ = require("lodash/fp");

module.exports = function filterByCardClass(cardClass) {
	if (!cardClass) {
		return _.map(x => x);
	}

	return _.filter(
		_.pipe(
			_.get("cardClass"),
			_.eq(cardClass)
		)
	);
};
