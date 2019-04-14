const _ = require("lodash/fp");

const getEnum = e => _.map(_.get(e));

const getAllMechanics = _.reduce(
	(acc, { mechanics }) => (mechanics ? [...acc, ...mechanics] : acc),
	[],
);

exports.createMechanics = _.pipe(
	getAllMechanics,
	_.uniq,
);

exports.makeEnum = e =>
	_.pipe(
		getEnum(e),
		_.uniq,
	);
