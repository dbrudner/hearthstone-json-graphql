const Meta = require("./schema");
const cardClasses = require("../../constants/card-classes");
const rarities = require("../../constants/rarities");
const { sets } = require("../../data/cards");

module.exports = {
	type: Meta,
	async resolve() {
		return { cardClasses, rarities, sets };
	},
};
