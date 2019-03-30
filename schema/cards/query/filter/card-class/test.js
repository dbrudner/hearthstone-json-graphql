const filterByCardClass = require(".");

const testData = [
	{
		text: "<b>Battlecry:</b> Deal 3 damage to your hero.",
		name: "Flame Imp",
		cost: 1,
		cardClass: "WARLOCK",
	},
	{
		name: "Flame Juggler",
		cardClass: "NEUTRAL",
	},
	{
		name: "Flame Geyser",
		cardClass: "MAGE",
	},
	{
		name: "Flame Lance",
		cardClass: "MAGE",
	},
	{
		name: "Flame Leviathan",
		cardClass: "MAGE",
	},
];

describe("card-class filter", () => {
	it("should return cards with only the card class passed in", () => {
		const expected = testData.slice(2);
		const actual = filterByCardClass({ filter: { cardClass: "MAGE" } })(
			testData,
		);

		expect(expected).toEqual(actual);
	});

	it("should return all cards if no arg is passed", () => {
		const actual = filterByCardClass()(testData);
		expect(testData).toEqual(actual);
	});
});
