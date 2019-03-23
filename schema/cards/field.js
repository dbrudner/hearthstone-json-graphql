const fetch = require("node-fetch");
const Cards = require("./schema");
const { GraphQLString } = require("graphql");
const _ = require("lodash/fp");

module.exports = {
	type: Cards,
	args: {
		name: {
			type: GraphQLString,
			description: "Do a search for a card by name.",
		},
		description: {
			type: GraphQLString,
			description: "Do a search for a card by description.",
		},
	},
	async resolve(parentValue, args) {
		const response = await fetch(
			"https://api.hearthstonejson.com/v1/25770/enUS/cards.collectible.json",
		);

		const data = await response.json();

		const searchOne = key => _.compose(_.map(key));

		const filterByName = searchOne("name");
		const filterByText = searchOne("text");

		const search = _.compose(
			filterByName,
			filterByText,
		);

		// const filterByText = data.filter(({ text }) => {
		// 	if (text) {
		// 		return text.includes(args.text);
		// 	}
		// });

		// const filterCards = _.compose(
		// 	filterByName,
		// 	filterByText,
		// );

		// const x = filterCards(data);
		// console.log(x);

		// return filterCards(data);
		return search(data);
	},
};
