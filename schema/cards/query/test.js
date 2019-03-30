const cards = require("../../../data/cards");
const query = require(".");

describe("query", () => {
	it("should have cards", () => {
		expect(cards).toBeTruthy();
	});
});

describe("full query with real data", () => {
	it("should filter cards", () => {
		const expected = query(cards, { filter: { name: "Azure Drake" } });

		expect(expected.length).toBe(1);
	});
});
