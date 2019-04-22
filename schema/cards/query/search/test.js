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
		type: "SPELL",
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
		type: "SPELL",
	},
];

describe("search filter", () => {
	it("shouldn't return all cards when no search arg is present", () => {
		const actual = search({})(testData);

		expect(actual).toEqual(testData);
	});

	it("should search card by name", () => {
		const expected = testData.slice(1);

		const actual = search({ search: "secret" })(testData);

		expect(expected).toEqual(actual);
	});

	it("should search card by text", () => {
		const expected = testData.slice(0, 1);

		const actual = search({ search: "damage" })(testData);

		expect(expected).toEqual(actual);
	});

	it("should filter real data", () => {
		const actual = search({
			search: "drake",
		})(cards);

		expect(actual.length).toBe(14);
	});
});
