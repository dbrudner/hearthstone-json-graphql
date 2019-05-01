const _ = require("lodash/fp");

const sort = args => {
	if (!args || !args.sort) {
		return x => x;
	}

	const sort = _.sortBy(args.sort.by);

	const direction =
		args.sort.direction === "desc" ? _.reverse : _.map(cards => cards);

	return _.flow(
		sort,
		direction,
	);
};

module.exports = sort;
