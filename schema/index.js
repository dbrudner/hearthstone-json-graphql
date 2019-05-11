const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const Cards = require("./cards/field");
const Meta = require("./meta/field");

module.exports = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: "RootQueryType",
		fields: {
			search: Cards,
			meta: Meta,
		},
	}),
});
