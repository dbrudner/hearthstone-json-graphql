const _ = require("lodash/fp");

const sort = args => {
	if (!args) {
		return _.map(cards => cards);
	}

	const sort = _.sortBy(args.by);

	const direction =
		args.direction === "desc" ? _.reverse : _.map(cards => cards);

	return _.flow(
		sort,
		direction
	);
};

module.exports = sort;
