const { GraphQLObjectType, GraphQLInt } = require("graphql");
const { cardClasses } = require("../../../data/cards");

const lightforgeFields = cardClasses.reduce((acc, cardClass) => {
	return {
		...acc,
		[cardClass]: {
			type: GraphQLInt,
		},
	};
}, {});

module.exports = new GraphQLObjectType({
	name: "lightforgeScores",
	fields: () => {
		return lightforgeFields;
	},
});
