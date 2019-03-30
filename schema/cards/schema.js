const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean,
} = require("graphql");

const LightforgeScore = new GraphQLObjectType({
	name: "LightforgeScore",
	fields: () => {
		return {
			Hero: { type: GraphQLString },
			Score: { type: GraphQLInt },
			StopAfterFirst: { type: GraphQLBoolean },
			StopAfterSecond: { type: GraphQLBoolean },
			Bucket: { type: GraphQLInt },
			SubBucket: { type: GraphQLInt },
		};
	},
});

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
			lightforgeScores: {
				type: GraphQLList(LightforgeScore),
			},
		};
	},
});

module.exports = new GraphQLList(Card);
