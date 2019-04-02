const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
} = require("graphql");
const cardClasses = require("../../constants/card-classes");
const rarities = require("../../constants/rarities");
const createEnum = require("../../lib/create-enum");
const _ = require("lodash");

const lightForgeFields = cardClasses.reduce((acc, cardClass) => {
	return {
		...acc,
		[cardClass]: {
			type: GraphQLInt,
		},
	};
}, {});

const Rarity = createEnum(rarities, "Rarity");

const Card = new GraphQLObjectType({
	name: "Card",
	fields: () => {
		return {
			name: { type: GraphQLString },
			id: { type: GraphQLString },
			dbfId: { type: GraphQLInt },
			text: { type: GraphQLString },
			rarity: { type: Rarity },
			flavor: { type: GraphQLString },
			artist: { type: GraphQLString },
			attack: { type: GraphQLInt },
			cardClass: { type: GraphQLString },
			collectible: { type: GraphQLString },
			cost: { type: GraphQLInt },
			elite: { type: GraphQLString },
			faction: { type: GraphQLString },
			set: { type: GraphQLString },
			health: { type: GraphQLInt },
			mechanics: {
				type: GraphQLList(GraphQLString),
			},
			lightForgeScores: {
				type: new GraphQLObjectType({
					name: "lightForgeScores",
					fields: () => {
						return lightForgeFields;
					},
				}),
			},
		};
	},
});

module.exports = new GraphQLList(Card);
