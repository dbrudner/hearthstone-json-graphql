const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLEnumType,
} = require("graphql");
const cardClasses = require("../../constants/card-classes");
const _ = require("lodash/fp");

const lightforgeFields = cardClasses.reduce((acc, cardClass) => {
	return {
		...acc,
		[cardClass]: {
			type: GraphQLInt,
		},
	};
}, {});

console.log(lightforgeFields);

const Rarity = new GraphQLEnumType({
	name: "Rarity",
	values: {
		free: {
			value: "FREE",
		},
		common: {
			value: "COMMON",
		},
		rare: {
			value: "RARE",
		},
		epic: {
			value: "EPIC",
		},
		legendary: {
			value: "LEGENDARY",
		},
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
			rarity: { type: Rarity },
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
				type: new GraphQLObjectType({
					name: "LightforgeScores",
					fields: () => {
						return lightforgeFields;
					},
				}),
			},
		};
	},
});

module.exports = new GraphQLList(Card);
