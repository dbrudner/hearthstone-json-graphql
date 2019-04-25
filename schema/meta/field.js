const Meta = require("./schema");
const {
	sets,
	cardClasses,
	rarities,
	types,
	race,
	mechanics,
} = require("../../data/cards");

module.exports = {
	type: Meta,
	async resolve() {
		return { cardClasses, rarities, sets, types, race, mechanics };
	},
};
