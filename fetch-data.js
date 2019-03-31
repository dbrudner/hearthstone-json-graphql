const fetch = require("node-fetch");
const fs = require("fs");

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

	const data = await cards.map(card => {
		const lightForgeScore = lightforgeScores.Cards.find(
			lightForgeCardData => lightForgeCardData.CardId === card.id,
		);

		const lightForgeScores =
			lightForgeScore && lightForgeScore.scores
				? lightForgeScore.scores.reduce(({ Hero, Score }, x) => {
						return { ...acc, [Hero.toLowerCase()]: Score };
				  }, {})
				: [];

		return {
			...card,
			lightForgeScores,
		};
	});

	fs.writeFileSync("./data/cards.json", JSON.stringify(data));
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
