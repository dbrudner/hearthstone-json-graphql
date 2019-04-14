const _ = require("lodash/fp");

const test = [
	{
		CardId: "WW_114",
		Cost: 7,
		Hero: "Priest",
		Name: "Nightscale Matriarch",
		Names: null,
		NewCard: false,
		Rarity: "Rare",
		Scores: [
			{
				Hero: "Priest",
				HeroPower: null,
				Score: 93,
				StopAfterFirst: false,
				StopAfterSecond: false,
				Bucket: 2,
				SubBucket: 2,
			},
		],
	},
	{
		CardId: "ROS_019",
		Cost: 2,
		Hero: "Priest",
		Name: "EVIL Conscripter",
		Names: null,
		NewCard: true,
		Rarity: "Common",
		Scores: [
			{
				Hero: "Priest",
				HeroPower: null,
				Score: 149,
				StopAfterFirst: false,
				StopAfterSecond: false,
				Bucket: 4,
				SubBucket: 2,
			},
		],
	},
];

const findLightforgeScore = cardId =>
	_.pipe(
		_.find(
			_.pipe(
				_.get(cardId),
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

const x = _.pipe(
	_.cond([[findLightforgeScore("blah"), _.stubArray]]),
	parseLightforgeScore,
);
