const Meta = require("./schema");
const { sets, cardClasses, rarities, types } = require("../../data/cards");

module.exports = {
	type: Meta,
	async resolve() {
		return { cardClasses, rarities, sets, types };
	},
};
