const fetch = require("node-fetch");
const fs = require("fs");
const _ = require("lodash");

const fetchAndWriteToJSON = async () => {
	const hearthStoneJSONResponse = await fetch(
		"https://api.hearthstonejson.com/v1/25770/enUS/cards.collectible.json",
	);
	const lightforgeResponse = await fetch(
		"http://thelightforge.com/api/TierList/Latest?locale=us",
	);

	const [hearthstoneJSONData, lightforgeData] = await Promise.all([
		hearthStoneJSONResponse,
		lightforgeResponse,
	]);

	const cards = await hearthstoneJSONData.json();
	const lightforgeScores = await lightforgeData.json();

	const cardsWithLightforge = await cards.map(card => {
		const lightForgeScore = lightforgeScores.Cards.find(
			lightForgeCardData => lightForgeCardData.CardId === card.id,
		);

		if (!lightForgeScore) {
			return card;
		}

		const lightForgeScores = lightForgeScore.Scores.reduce(
			(acc, { Hero, Score }) => {
				return {
					...acc,
					[Hero ? Hero.toUpperCase() : "NEUTRAL"]: Score,
				};
			},
			{},
		);

		return {
			...card,
			lightForgeScores,
		};
	});

	const makeEnum = e => _.uniq(_.map(cards, x => _.get(x, e)));

	const sets = makeEnum("set");
	const types = makeEnum("type");
	const rarities = makeEnum("rarity");
	const cardClasses = makeEnum("cardClass");

	const mechanics = _.uniq(
		_.reduce(
			cards,
			(acc, { mechanics }) => (mechanics ? [...acc, ...mechanics] : acc),
			[],
		),
	);

	fs.writeFileSync(
		"./data/cards.json",
		JSON.stringify({
			cards: cardsWithLightforge,
			sets,
			types,
			rarities,
			mechanics,
			cardClasses,
		}),
	);
};

try {
	(async () => {
		await fetchAndWriteToJSON();
		await console.log("Exiting w/ success");
	})();
} catch (err) {
	console.log("Fetch failed");
	throw err;
}
