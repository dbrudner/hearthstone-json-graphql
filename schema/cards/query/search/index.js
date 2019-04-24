const Fuse = require("fuse.js");
const _ = require("lodash");

module.exports = args => {
	const searchTerm = _.get(args, "search");

	if (!searchTerm) {
		return x => x;
	}

	const options = {
		keys: ["name", "text", "race"],
		threshold: 0.2,
		shouldSort: true,
	};

	return cards => new Fuse(cards, options).search(searchTerm);
};
