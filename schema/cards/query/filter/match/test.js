const match = require(".");
const { cards } = require("../../../../../data/cards");

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

describe("match filter", () => {
	it("shouldn't filter when no args are passed", () => {
		const actual = match({})(testData);

		expect(actual).toEqual(testData);
	});

	it("should filter cards when name is passed in args", () => {
		const expected = testData.slice(1);

		const actual = match({ filter: { name: "s" } })(testData);

		expect(expected).toEqual(actual);
	});

	it("should filter cards when text is passed in args", () => {
		const expected = testData.slice(1);

		const actual = match({ filter: { text: "secret" } })(testData);

		expect(expected).toEqual(actual);
	});

	it("should filter cards when text is passed in args", () => {
		const expected = testData.slice(1);

		const actual = match({ filter: { flavor: "burning" } })(testData);

		expect(expected).toEqual(actual);
	});

	it("should filter for cards when multiple where args are passed in", () => {
		const expected = testData.slice(1);

		const actual = match({
			filter: {
				flavor: "Burning",
				text: "secret",
				name: "s",
			},
		})(testData);

		expect(expected).toEqual(actual);
	});

	it("should filter real data", () => {
		const actual = match({
			filter: {
				name: "azure drake",
			},
		})(cards);

		expect(actual.length).toBe(1);
	});
});
