const fetch = require("node-fetch");
const Cards = require("./schema");
const { GraphQLString, GraphQLInputObjectType } = require("graphql");
const query = require("./query");

module.exports = {
	type: Cards,
	args: {
		where: {
			type: new GraphQLInputObjectType({
				name: "Where",
				fields: {
					name: {
						type: new GraphQLInputObjectType({
							name: "name",
							fields: {
								matches: {
									name: "Matches",
									type: GraphQLString,
								},
							},
						}),
					},
					text: {
						type: new GraphQLInputObjectType({
							name: "text",
							fields: {
								matches: {
									name: "Matches",
									type: GraphQLString,
								},
							},
						}),
					},
					flavor: {
						type: new GraphQLInputObjectType({
							name: "flavor",
							fields: {
								matches: {
									name: "Matches",
									type: GraphQLString,
								},
							},
						}),
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
