const search = require(".");
const { cards } = require("../../../../data/cards");

const testData = [
	{
		artist: "Nutthapon Petchthai",
		cardClass: "MAGE",
		collectible: true,
		cost: 5,
		dbfId: 2539,
		flavor:
			"It's on the rack next to ice lance, acid lance, and English muffin lance.",
		id: "AT_001",
		name: "adf",
		playRequirements: { REQ_MINION_TARGET: 0, REQ_TARGET_TO_PLAY: 0 },
		rarity: "COMMON",
		set: "TGT",
		text: "Deal $8 damage to a minion.",
		type: "SPELL"
	},
	{
		artist: "Tooth",
		cardClass: "MAGE",
		collectible: true,
		cost: 3,
		dbfId: 2541,
		flavor: "Burning man, brah.",
		id: "AT_002",
		mechanics: ["SECRET"],
		name: "asdf",
		rarity: "RARE",
		set: "TGT",
		text:
			"<b>Secret:</b> When a friendly minion dies, summon a random minion with the same Cost.",
		type: "SPELL"
	},
	{
		artist: "Tooth",
		cardClass: "MAGE",
		collectible: true,
		cost: 3,
		dbfId: 2541,
		flavor: "LOL.",
		id: "AT_002",
		name: "Guy thing",
		rarity: "RARE",
		set: "TGT",
		text: "Checking for blrglrg.",
		type: "SPELL",
		race: "murloc"
	}
];

const test2 = [
	{
		artist: "Wayne Reynolds",
		attack: 5,
		cardClass: "MAGE",
		collectible: true,
		cost: 7,
		dbfId: 1080,
		elite: true,
		flavor:
			"Antonidas was the Grand Magus of the Kirin Tor, and Jaina's mentor.  This was a big step up from being Grand Magus of Jelly Donuts.",
		health: 7,
		id: "EX1_559",
		mechanics: ["TRIGGER_VISUAL"],
		name: "Archmage Antonidas",
		rarity: "LEGENDARY",
		set: "EXPERT1",
		text: "Whenever you cast a spell, add a Fireball spell to your hand.",
		type: "MINION",
		images: {
			small:
				"https://art.hearthstonejson.com/v1/render/latest/enUS/256x/EX1_559.png",
			large:
				"https://art.hearthstonejson.com/v1/render/latest/enUS/512x/EX1_559.png",
			tile: "https://art.hearthstonejson.com/v1/tiles/EX1_559.png"
		},
		lightforge: { MAGE: 156 }
	}
];

describe("search filter", () => {
	it("should return all cards when no search arg is present", () => {
		const actual = search({})(testData);

		expect(actual).toEqual(testData);
	});

	it("should search card by name", () => {
		const expected = testData.slice(1, 2);

		const actual = search({ search: "secret" })(testData);

		expect(expected).toEqual(actual);
	});

	it("should search card by text", () => {
		const expected = testData.slice(0, 1);

		const actual = search({ search: "damage" })(testData);

		expect(expected).toEqual(actual);
	});

	it("should search card by race", () => {
		const expected = testData.slice(2);

		const actual = search({ search: "murloc" })(testData);

		expect(expected).toEqual(actual);
	});

	it("should search card text", () => {
		const actual = search({ search: "fireball" })(test2);
		const expected = test2;

		expect(actual).toEqual(expected);
	});
});
