const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
} = require("graphql");

const Card = new GraphQLObjectType({
	name: "Card",
	fields: () => {
		return {
			name: { type: GraphQLString },
			id: { type: GraphQLString },
			dbfId: { type: GraphQLInt },
			text: { type: GraphQLString },
			flavor: { type: GraphQLString },
			artist: { type: GraphQLString },
			attack: { type: GraphQLInt },
			cardClass: { type: GraphQLString },
			collectible: { type: GraphQLString },
			cost: { type: GraphQLInt },
			elite: { type: GraphQLString },
			faction: { type: GraphQLString },
			health: { type: GraphQLInt },
			mechanics: {
				type: GraphQLList(GraphQLString),
			},
		};
	},
});

module.exports = new GraphQLList(Card);
