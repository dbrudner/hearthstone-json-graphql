const fetch = require("node-fetch");
const Cards = require("./schema");
const {
	GraphQLString,
	GraphQLInputObjectType,
	GraphQLInt,
} = require("graphql");
const query = require("./query");

const quantity = new GraphQLInputObjectType({
	name: "Quantity",
	fields: {
		isLessThan: {
			type: GraphQLInt,
		},
		isGreaterThan: {
			type: GraphQLInt,
		},
		isEqualTo: {
			type: GraphQLInt,
		},
	},
});

module.exports = {
	type: Cards,
	args: {
		filter: {
			type: new GraphQLInputObjectType({
				name: "Filter",
				fields: {
					name: { type: GraphQLString },
					text: { type: GraphQLString },
					flavor: { type: GraphQLString },
					health: { type: quantity },
					attack: { type: quantity },
					cost: { type: quantity },
				},
			}),
			description: "Search for cards.",
		},
		sort: {
			type: new GraphQLInputObjectType({
				name: "Sorted",
				fields: {
					by: {
						type: GraphQLString,
					},
					direction: {
						type: GraphQLString,
					},
				},
			}),
			description: "Sort cards by property in either direction.",
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
