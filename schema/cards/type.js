const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
} = require("graphql");
const {
	CardClass,
	Rarity,
	Set,
	Type,
	Race,
	Mechanic,
} = require("./types/enums");
const Images = require("./types/images");
const LightforgeScores = require("./types/lightforge-scores");

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
			cardClass: { type: CardClass },
			collectible: { type: GraphQLString },
			cost: { type: GraphQLInt },
			elite: { type: GraphQLString },
			faction: { type: GraphQLString },
			set: { type: Set },
			race: { type: Race },
			health: { type: GraphQLInt },
			images: {
				type: Images,
			},
			tileImgUrl: { type: GraphQLString },
			type: { type: Type },
			mechanics: {
				type: GraphQLList(Mechanic),
			},
			lightforge: {
				type: LightforgeScores,
			},
		};
	},
});

module.exports = new GraphQLList(Card);
