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
	fields: () => ({
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
		lightforgeScores: {
			type: LightforgeScores,
		},
	}),
});

const Meta = new GraphQLObjectType({
	name: "_Meta",
	fields: () => ({
		total: { type: GraphQLInt },
		first: { type: GraphQLInt },
		last: { type: GraphQLInt },
	}),
});

module.exports = new GraphQLObjectType({
	name: "Data",
	fields: () => ({
		data: { type: new GraphQLList(Card) },
		_meta: { type: Meta },
	}),
});
