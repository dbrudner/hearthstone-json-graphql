const _ = require("lodash/fp");

const findLightforgeScore = cardId =>
	_.pipe(
		_.find(
			_.pipe(
				_.get("CardId"),
				_.eq(cardId),
			),
		),
		_.get("Scores"),
	);

const parseLightforgeScore = _.reduce(
	(acc, { Hero, Score }) => ({
		...acc,
		[Hero ? Hero.toUpperCase() : "NEUTRAL"]: Score,
	}),
	{},
);

module.exports = x =>
	_.pipe(
		findLightforgeScore(x),
		parseLightforgeScore,
	);
