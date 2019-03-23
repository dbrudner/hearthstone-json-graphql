const fetch = require("node-fetch");
const Cards = require("./schema");
const { GraphQLString } = require("graphql");
const _ = require("lodash/fp");

module.exports = {
	type: Cards,
	args: {
		name: {
			type: GraphQLString,
			description: "Do a search for a card by name.",
		},
		text: {
			type: GraphQLString,
			description: "Do a search for a card by description.",
		},
	},
	async resolve(parentValue, args) {
		const response = await fetch(
			"https://api.hearthstonejson.com/v1/25770/enUS/cards.collectible.json",
		);

		const data = await response.json();
		const searchCardProperty = key => card =>
			card[key] && card[key].includes(args[key] || "");

		const filterByKey = key => _.filter(searchCardProperty(key));

		const search = _.compose(
			filterByKey("name"),
			filterByKey("text"),
		);

		return search(data);
	},
};
