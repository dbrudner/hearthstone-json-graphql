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

		const includesName = strIncludes(args.name);
		const searchName = searchCardProperty("name");

		return search(data);
	},
};
