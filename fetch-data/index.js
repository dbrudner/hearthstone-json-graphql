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

	const [hearthstoneJSONData, lightforgeData] = await Promise.all([
		hearthStoneJSONResponse,
		lightforgeResponse,
	]);

	const hearthstoneJSON = await hearthstoneJSONData.json();
	const lightforge = await lightforgeData.json();

	const cards = hearthstoneJSON.map(card => {
		const { id } = card;

		const getLightforgeScore = createLightforgeScore(id);

		return {
			...card,
			images: images(id),
			lightforge: getLightforgeScore(lightforge.Cards),
		};
	});

	const sets = makeEnum("set");
	const types = makeEnum("type");
	const rarities = makeEnum("rarity");
	const cardClasses = makeEnum("cardClass");
	const races = makeEnum("race");

	fs.writeFileSync(
		"./data/cards.json",
		JSON.stringify({
			cards,
			sets: sets(cards),
			types: types(cards),
			rarities: rarities(cards),
			cardClasses: cardClasses(cards),
			races: races(cards),
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
