const { GraphQLInputObjectType, GraphQLInt } = require("graphql");

module.exports = new GraphQLInputObjectType({
	name: "Results",
	fields: {
		limit: {
			type: GraphQLInt,
		},
		page: {
			type: GraphQLInt,
		},
		offset: {
			type: GraphQLInt,
		},
	},
});
