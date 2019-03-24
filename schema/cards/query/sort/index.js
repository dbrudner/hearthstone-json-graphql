const _ = require("lodash/fp");

const sort = args => cards => {
	if (!args.order) {
		return cards;
	}

	const fn = by =>
		cards.sort((a, b) => {
			if (args.order.direction === "asc") {
				return a[by] - b[by];
			}
			return b[by] - a[by];
		});

	return fn(args.order.by);
};

module.exports = sort;
