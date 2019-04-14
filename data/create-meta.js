const _ = require("lodash/fp");

const test = {
	HUNTER: [
		{
			dbf_id: 51159,
			popularity: 4.328381280236629,
			winrate: 53.12484918681531,
			count: 1.44,
			decks: 4664,
		},
		{
			dbf_id: 394,
			popularity: 0.893625554599309,
			winrate: 48.73772791023843,
			count: 1.22,
			decks: 1250,
		},
	],
};

const findCard = card =>
	_.pipe(
		_.pick([card.cardClass.toUpperCase(), "ALL"]),
		_.find(_.pipe(_.get("dbf_id")), _.eq(card.dbfId)),
	);
