const { cards } = require("../../../test/mock-data");
const query = require(".");

describe("query", () => {
	it("should have cards", () => {
		expect(cards).toBeTruthy();
	});

	it("should filter cards", () => {
		const expected = query(cards, {
			where: { name: { matches: "Azure Drake" } },
		});

		expect(expected.length).toBe(1);
	});

	it("should sort cards", () => {
		const expected = query(cards, {
			where: { name: { matches: "R" }, text: { matches: "Inspire" } },
		});

		console.log(expected);

		expect(expected.length).toBe(1);
	});
});
