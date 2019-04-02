const paginate = require(".");

let testData = [];

for (let i = 0; i < 300; i++) {
	testData.push(Math.random());
}

describe("Paginate", () => {
	it("should limit the number of results if limit is passed in", () => {
		const actual = paginate({ results: { limit: 30 } })(testData);
		expect(actual).toEqual(testData.slice(0, 30));
	});

	it("should return a slice based on offset and limit props", () => {
		const actual = paginate({ results: { limit: 20, offset: 20 } })(
			testData,
		);
		expect(actual).toEqual(testData.slice(20, 40));
	});

	it("should return a slice based on offset and limit props", () => {
		const actual = paginate({ results: { offset: 20 } })(testData);
		expect(actual).toEqual(testData.slice(20, 70));
	});

	it("should return a paginated slice if paginate prop is passed", () => {
		const actual = paginate({
			results: { page: 2, limit: 10 },
		})(testData);

		expect(actual).toEqual(testData.slice(10, 20));
	});
});
