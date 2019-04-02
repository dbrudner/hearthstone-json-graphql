const _ = require("lodash/fp");

module.exports = args => {
	const page = _.get("results.page", args) || 1;
	const offset = _.get("results.offset", args) || 0;
	const limit = _.get("results.limit", args) || 50;

	const sliceStart = offset + limit * (page - 1);
	const sliceEnd = limit * page + offset;

	return _.slice(sliceStart, sliceEnd);
};
