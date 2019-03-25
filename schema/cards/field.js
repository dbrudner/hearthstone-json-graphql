const fetch = require("node-fetch");
const Cards = require("./schema");
const { GraphQLString, GraphQLInputObjectType } = require("graphql");
const query = require("./query");

const matches = new GraphQLInputObjectType({
	name: "Matches",
	fields: {
		matches: {
			type: GraphQLString,
		},
	},
});

module.exports = {
	type: Cards,
	args: {
		where: {
			type: new GraphQLInputObjectType({
				name: "Where",
				fields: {
					name: {
						type: matches,
					},
					text: {
						type: matches,
					},
					flavor: {
						type: matches,
					},
				},
			}),
			description: "Search for cards.",
		},
	},
	async resolve(_, args) {
		const response = await fetch(
			"https://api.hearthstonejson.com/v1/25770/enUS/cards.collectible.json",
		);

		const data = await response.json();

		return query(data, args);
	},
};
