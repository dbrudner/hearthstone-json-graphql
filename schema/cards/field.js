const fetch = require("node-fetch");
const Cards = require("./schema");
const { GraphQLString, GraphQLInputObjectType } = require("graphql");
const search = require("./search");

module.exports = {
	type: Cards,
	args: {
		where: {
			type: new GraphQLInputObjectType({
				name: "Where",
				fields: {
					name: { type: GraphQLString },
					matches: { type: GraphQLString }
				}
			}),
			description: "Search for cards."
		}
	},
	async resolve(_, args) {
		const response = await fetch(
			"https://api.hearthstonejson.com/v1/25770/enUS/cards.collectible.json"
		);

		const data = await response.json();

		return search(data, args);
	}
};
