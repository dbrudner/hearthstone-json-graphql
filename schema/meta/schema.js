const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

module.exports = new GraphQLObjectType({
	name: "Meta",
	fields: () => {
		return {
			cardClasses: { type: new GraphQLList(GraphQLString) },
			rarities: { type: new GraphQLList(GraphQLString) },
			sets: { type: new GraphQLList(GraphQLString) },
		};
	},
});
