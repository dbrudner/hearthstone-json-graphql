const fetch = require("node-fetch");
const fs = require("fs");
const { makeEnum, createMechanics } = require("./make-enum");
const images = require("./images");
const createLightforgeScore = require("./create-lightforge-score");

const fetchAndWriteToJSON = async () => {
	const hearthStoneJSONResponse = await fetch(
		"https://api.hearthstonejson.com/v1/25770/enUS/cards.collectible.json",
	);

	const lightforgeResponse = await fetch(
		"http://thelightforge.com/api/TierList/Latest?locale=us",
	);

	const hsReplayResponse = await fetch(
		"https://hsreplay.net/analytics/query/card_included_popularity_report/?GameType=RANKED_STANDARD&TimeRange=CURRENT_EXPANSION&RankRange=ALL",
	);

	const [
		hearthstoneJSONData,
		lightforgeData,
		hsReplayData,
	] = await Promise.all([
		hearthStoneJSONResponse,
		lightforgeResponse,
		hsReplayResponse,
	]);

	const cards = await hearthstoneJSONData.json();
	const lightforgeScores = await lightforgeData.json();

	const parsedCards = await cards.map(card => {
		const { id } = card;

		const getLightforgeScore = createLightforgeScore(id);

		return {
			...card,
			images: images(id),
			lightforgeScores: getLightforgeScore(lightforgeScores.Cards),
		};
	});

	const sets = makeEnum("set");
	const types = makeEnum("type");
	const rarities = makeEnum("rarity");
	const cardClasses = makeEnum("cardClass");

	fs.writeFileSync(
		"./data/cards.json",
		JSON.stringify({
			cards: parsedCards,
			sets: sets(cards),
			types: types(cards),
			rarities: rarities(cards),
			cardClasses: cardClasses(cards),
			mechanics: createMechanics(cards),
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
