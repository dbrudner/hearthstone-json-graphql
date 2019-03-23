const fetch = require("node-fetch");
const Cards = require("./schema");

module.exports = {
	type: Cards,
	async resolve(parentValue, args) {
		const response = await fetch(
			"https://api.hearthstonejson.com/v1/25770/enUS/cards.collectible.json",
		);

		const data = await response.json();

		return data;
	},
};
