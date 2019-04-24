const { GraphQLString, GraphQLInputObjectType } = require("graphql");

module.exports = new GraphQLInputObjectType({
	name: "Sorted",
	fields: {
		by: {
			type: GraphQLString,
		},
		direction: {
			type: GraphQLString,
		},
	},
});
