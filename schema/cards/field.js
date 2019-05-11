const Cards = require("./type");
const { GraphQLString, GraphQLInt } = require("graphql");
const query = require("./query");
const data = require("../../data/cards");
const Filter = require("./types/filter");
const Sort = require("./types/sort");

module.exports = {
	type: Cards,
	args: {
		filter: {
			type: Filter,
			description: "Search for cards",
		},
		sort: {
			type: Sort,
			description: "Sort cards by property in either direction",
		},
		limit: {
			type: GraphQLInt,
		},
		page: {
			type: GraphQLInt,
		},
		offset: {
			type: GraphQLInt,
		},
		search: {
			type: GraphQLString,
			description: "Fuzzy search for card names and card text",
		},
	},
	async resolve(o, args) {
		const cards = await query(data.cards, args);
		const _meta = await {
			total: cards.length,
		};

		return { data: cards, _meta };
	},
};
