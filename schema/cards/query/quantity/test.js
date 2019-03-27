const quantity = require(".");

const testData = () => [
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
		attack: 5,
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
		attack: 3,
	},
	{
		artist: "Tooth",
		cardClass: "MAGE",
		collectible: true,
		cost: 1,
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
		attack: 1,
	},
];

describe("quantity", () => {
	it("should find cards less than number passed in args as isLessThan", () => {
		const fn = quantity({ cost: { isLessThan: 4 } });

		const actual = fn(testData());

		const expected = testData().slice(1);

		expect(expected).toEqual(actual);
	});

	it("should find cards greater than number passed in args as isGreaterThan", () => {
		const fn = quantity({ cost: { isGreaterThan: 4 } });

		const actual = fn(testData());

		const expected = testData().slice(0, 1);

		expect(expected).toEqual(actual);
	});

	it("should find cards equal to the number passed in args as isEqualTo", () => {
		const fn = quantity({ cost: { isEqualTo: 5 } });

		const actual = fn(testData());

		const expected = testData().slice(0, 1);

		expect(expected).toEqual(actual);
	});

	it("should be able to pass in multiple args", () => {
		const fn = quantity({
			cost: { isLessThan: 4, isGreaterThan: 2 },
		});

		const actual = fn(testData());

		const expected = testData().slice(1, 2);

		expect(expected).toEqual(actual);
	});
});
