const _ = require("lodash/fp");
const { GraphQLEnumType } = require("graphql");

const createValues = _.pipe(
	_.keyBy(x => x),
	_.mapValues(x => ({ value: x.toUpperCase() })),
);

module.exports = (values, name) => {
	return new GraphQLEnumType({
		name,
		values: createValues(values),
	});
};
