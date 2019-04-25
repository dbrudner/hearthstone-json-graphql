const _ = require("lodash/fp");
const get = require("lodash/get");

const filterByEnum = args => {
	const createFilter = enumerable => {
		const arg = get(args, `filter.${enumerable}`);

		if (!arg) {
			return _.map(x => x);
		}

		const hasAllMechanics = mechanicsFromCard => {
			if (!mechanicsFromCard) {
				return false;
			}

			return arg.every(m => mechanicsFromCard.includes(m));
		};

		return _.filter(
			_.pipe(
				_.get(enumerable),
				enumerable === "mechanics"
					? hasAllMechanics
					: _.eq(args.filter[enumerable]),
			),
		);
	};

	return _.pipe(
		createFilter("cardClass"),
		createFilter("rarity"),
		createFilter("set"),
		createFilter("type"),
		createFilter("mechanics"),
	);
};

module.exports = filterByEnum;
