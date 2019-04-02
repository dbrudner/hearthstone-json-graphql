const _ = require("lodash/fp");
const get = require("lodash/get");

const filterByEnum = args => {
	const createFilter = enumerable => {
		const arg = get(args, `filter.${enumerable}`);

		if (!arg) {
			return _.map(x => x);
		}

		return _.filter(
			_.pipe(
				_.get(enumerable),
				_.eq(args.filter[enumerable]),
			),
		);
	};

	return _.pipe(
		createFilter("cardClass"),
		createFilter("rarity"),
	);
};

module.exports = filterByEnum;
