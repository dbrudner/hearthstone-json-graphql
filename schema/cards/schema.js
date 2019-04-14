const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
} = require("graphql");
const createEnum = require("../../lib/create-enum");
const _ = require("lodash");
const { rarities, cardClasses, types } = require("../../data/cards");

const lightforgeFields = cardClasses.reduce((acc, cardClass) => {
	return {
		...acc,
		[cardClass]: {
			type: GraphQLInt,
		},
	};
}, {});

const Rarity = createEnum(rarities, "Rarity");
const Type = createEnum(types, "Type");

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
			images: {
				type: new GraphQLObjectType({
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
				}),
			},
			tileImgUrl: { type: GraphQLString },
			type: { type: Type },
			mechanics: {
				type: GraphQLList(GraphQLString),
			},
			lightforgeScores: {
				type: new GraphQLObjectType({
					name: "lightforgeScores",
					fields: () => {
						return lightforgeFields;
					},
				}),
			},
		};
	},
});

module.exports = new GraphQLList(Card);
