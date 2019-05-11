const {
	GraphQLString,
	GraphQLInputObjectType,
	GraphQLEnumType,
} = require("graphql");

module.exports = new GraphQLInputObjectType({
	name: "Sorted",
	fields: {
		by: {
			type: new GraphQLEnumType({
				name: "by",
				values: {
					COST: {
						value: "cost",
					},
					HEALTH: {
						value: "health",
					},
					ATTACK: {
						value: "attack",
					},
				},
			}),
		},
		direction: {
			type: new GraphQLEnumType({
				name: "direction",
				values: {
					ASCENDING: {
						value: "asc",
					},
					DESCENDING: {
						value: "desc",
					},
				},
			}),
		},
	},
});
