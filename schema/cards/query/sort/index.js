const _ = require("lodash/fp");

const sort = args => {
	if (!args.order) {
		return _.map(cards => cards);
	}

	const sort = _.sortBy(args.order.by);

	const direction =
		args.order.direction === "desc" ? _.reverse : _.map(cards => cards);

	return _.flow(
		sort,
		direction,
	);
};

module.exports = sort;
