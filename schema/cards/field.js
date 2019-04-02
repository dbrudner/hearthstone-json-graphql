const Cards = require("./schema");
const {
	GraphQLString,
	GraphQLInputObjectType,
	GraphQLInt,
} = require("graphql");
const query = require("./query");
const _ = require("lodash/fp");
const { cards } = require("../../data/cards");
const cardClasses = require("../../constants/card-classes");
const rarities = require("../../constants/rarities");
const createEnum = require("../../lib/create-enum");
const { sets } = require("../../data/cards");

const cardClass = createEnum(cardClasses, "cardClass");
const rarity = createEnum(rarities, "rarities");
const set = createEnum(sets, "set");

const quantity = new GraphQLInputObjectType({
	name: "Quantity",
	fields: {
		isLessThan: {
			type: GraphQLInt,
		},
		isGreaterThan: {
			type: GraphQLInt,
		},
		isEqualTo: {
			type: GraphQLInt,
		},
	},
});

module.exports = {
	type: Cards,
	args: {
		filter: {
			type: new GraphQLInputObjectType({
				name: "Filter",
				fields: {
					name: { type: GraphQLString },
					text: { type: GraphQLString },
					flavor: { type: GraphQLString },
					health: { type: quantity },
					attack: { type: quantity },
					cost: { type: quantity },
					cardClass: { type: cardClass },
					rarity: { type: rarity },
					set: { type: set },
				},
			}),
			description: "Search for cards.",
		},
		sort: {
			type: new GraphQLInputObjectType({
				name: "Sorted",
				fields: {
					by: {
						type: GraphQLString,
					},
					direction: {
						type: GraphQLString,
					},
				},
			}),
			description: "Sort cards by property in either direction.",
		},
	},
	async resolve(_, args) {
		return query(cards, args);
	},
};
