const Cards = require("./type");
const { GraphQLString } = require("graphql");
const query = require("./query");
const { cards } = require("../../data/cards");
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
		search: {
			type: GraphQLString,
			description: "Fuzzy search for card names and card text",
		},
	},
	async resolve(_, args) {
		return query(cards, args);
	},
};
