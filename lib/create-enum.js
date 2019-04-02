const _ = require("lodash/fp");

module.exports = _.pipe(
	_.keyBy(x => x),
	_.mapValues(x => ({ value: x.toUpperCase() })),
);
