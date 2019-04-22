const Cards = require("./schema");
const {
	GraphQLString,
	GraphQLInputObjectType,
	GraphQLInt,
	GraphQLList,
} = require("graphql");
const query = require("./query");
const { cards } = require("../../data/cards");
const createEnum = require("../../lib/create-enum");
const {
	sets,
	rarities,
	cardClasses,
	types,
	mechanics,
} = require("../../data/cards");

const cardClass = createEnum(cardClasses, "cardClass");
const rarity = createEnum(rarities, "rarity");
const set = createEnum(sets, "set");
const type = createEnum(types, "type");
const mechanic = createEnum(mechanics, "mechanic");

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
					type: { type },
					mechanics: { type: GraphQLList(mechanic) },
				},
			}),
			description: "Search for cards",
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
			description: "Sort cards by property in either direction",
		},
		results: {
			type: new GraphQLInputObjectType({
				name: "Results",
				fields: {
					limit: {
						type: GraphQLInt,
					},
					page: {
						type: GraphQLInt,
					},
					offset: {
						type: GraphQLInt,
					},
				},
			}),
			description: "Pagination and result limits.",
		},
		search: {
			type: GraphQLString,
			description: "Fuzzy search for card names and card text",
		},
	},
	async resolve(_, args) {
		return query(cards, args);
	},
};
