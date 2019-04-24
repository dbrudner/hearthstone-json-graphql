const _ = require("lodash/fp");
const get = require("lodash/get");

const makeLowercase = _.map(_.lowerCase);

const filterByEnum = args => {
	const createFilter = enumerable => {
		const arg = get(args, `filter.${enumerable}`);

		if (!arg) {
			return _.map(x => x);
		}

		return _.filter(
			_.pipe(
				_.get(enumerable),
				enumerable === "mechanics"
					? _.pipe(
							_.every(m =>
								makeLowercase(arg).includes(m.toLowerCase()),
							),
					  )
					: _.eq(arg),
			),
		);
	};

	return _.pipe(
		createFilter("cardClass"),
		createFilter("rarity"),
		createFilter("set"),
		createFilter("type"),
		createFilter("race"),
		createFilter("mechanics"),
	);
};

module.exports = filterByEnum;
