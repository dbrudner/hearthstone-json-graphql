const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const Cards = require("./cards/field");

module.exports = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: "RootQueryType",
		fields: {
			cards: Cards,
		},
	}),
});
