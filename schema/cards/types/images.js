const { GraphQLObjectType, GraphQLString } = require("graphql");

module.exports = new GraphQLObjectType({
	name: "images",
	fields: () => ({
		small: {
			type: GraphQLString,
		},
		large: {
			type: GraphQLString,
		},
		tile: {
			type: GraphQLString,
		},
	}),
});
