const filterByEnum = require(".");

const testData = [
	{
		text: "<b>Battlecry:</b> Deal 3 damage to your hero.",
		name: "Flame Imp",
		cost: 1,
		cardClass: "WARLOCK",
		rarity: "COMMON",
	},
	{
		name: "Flame Juggler",
		cardClass: "NEUTRAL",
		rarity: "COMMON",
	},
	{
		name: "Flame Geyser",
		cardClass: "MAGE",
		rarity: "COMMON",
	},
	{
		name: "Flame Lance",
		cardClass: "MAGE",
		rarity: "COMMON",
	},
	{
		name: "Flame Leviathan",
		cardClass: "MAGE",
		rarity: "RARE",
	},
];

describe("card-class filter", () => {
	it("should return cards with only the card class passed in", () => {
		const expected = testData.slice(4);
		const actual = filterByEnum({
			filter: { cardClass: "MAGE", rarity: "RARE" },
		})(testData);

		expect(expected).toEqual(actual);
	});

	it("should return cards with only the card rarity passed in", () => {
		const expected = testData.slice(4);
		const actual = filterByEnum({ filter: { rarity: "RARE" } })(testData);

		expect(expected.length).toEqual(actual.length);
	});

	it("should return cards with only the card class passed in", () => {
		const expected = testData.slice(2);
		const actual = filterByEnum({ filter: { cardClass: "MAGE" } })(
			testData,
		);

		expect(expected.length).toEqual(actual.length);
	});

	it("should return all cards if no arg is passed", () => {
		const actual = filterByEnum()(testData);
		expect(testData).toEqual(actual);
	});
});
