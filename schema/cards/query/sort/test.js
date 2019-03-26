const sort = require(".");

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
		name: "a",
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
	{
		artist: "Tooth",
		cardClass: "MAGE",
		collectible: true,
		cost: 3,
		dbfId: 2541,
		flavor: "Burning man, brah.",
		id: "AT_002",
		mechanics: ["SECRET"],
		name: "zxcv",
		rarity: "RARE",
		set: "TGT",
		text:
			"<b>Secret:</b> When a friendly minion dies, summon a random minion with the same Cost.",
		type: "SPELL",
	},
];

describe("sort", () => {
	it("should sort descendingly alphabetically when name is passed in and order is 'desc'", () => {
		const actual = sort({
			order: { by: "name", direction: "desc" },
		})(testData);

		const expected = testData;

		expect(expected).toEqual(actual);
	});

	it("should sort ascendingly alphabetically when name is passed in and order is 'asc'", () => {
		const actual = sort({
			order: { by: "name", direction: "asc" },
		})(testData);

		const expected = testData.reverse();

		expect(expected).toEqual(actual);
	});

	it("shouldn't sort if no args are passed", () => {
		const actual = sort({})(testData);

		const expected = testData;

		expect(expected).toEqual(actual);
	});
});
