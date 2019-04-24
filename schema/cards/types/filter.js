const {
	GraphQLString,
	GraphQLInputObjectType,
	GraphQLList,
} = require("graphql");
const { CardClass, Rarity, Set, Type, Race, Mechanic } = require("./enums");
const Quantity = require("./quantity");

module.exports = new GraphQLInputObjectType({
	name: "Filter",
	fields: {
		name: { type: GraphQLString },
		text: { type: GraphQLString },
		flavor: { type: GraphQLString },
		health: { type: Quantity },
		attack: { type: Quantity },
		cost: { type: Quantity },
		cardClass: { type: CardClass },
		rarity: { type: Rarity },
		set: { type: Set },
		type: { type: Type },
		race: { type: Race },
		mechanics: { type: GraphQLList(Mechanic) },
	},
});
