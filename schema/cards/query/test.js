const { cards } = require("../../../data/cards");
const query = require(".");

describe("query", () => {
	it("should have cards", () => {
		expect(cards).toBeTruthy();
	});
});

describe("full query with real data", () => {
	it("should filter cards", () => {
		const actual = query(cards, { filter: { name: "Azure Drake" } });

		expect(actual.length).toBe(1);
	});

	it("should pass a test with real data", () => {
		const expected = [
			{
				name: "Aluneth",
			},
			{
				name: "Anomalus",
			},
			{
				name: "Archmage Antonidas",
			},
			{
				name: "Archmage Arugal",
			},
			{
				name: "Dragoncaller Alanna",
			},
			{
				name: "Flame Leviathan",
			},
			{
				name: "Frost Lich Jaina",
			},
			{
				name: "Inkmaster Solia",
			},
			{
				name: "Luna's Pocket Galaxy",
			},
			{
				name: "Open the Waygate",
			},
			{
				name: "Pyros",
			},
			{
				name: "Rhonin",
			},
			{
				name: "Sindragosa",
			},
			{
				name: "Stargazer Luna",
			},
			{
				name: "Toki, Time-Tinker",
			},
		];

		const actual = query(cards, {
			filter: { cardClass: "MAGE", rarity: "LEGENDARY" },
			sort: { by: "name" },
		});

		expect(actual.map(({ name }) => ({ name }))).toEqual(expected);
	});

	it("should perform a search", () => {
		const actual = query(cards, { search: "drake" });

		expect(actual.length).toBe(14);
	});
});
