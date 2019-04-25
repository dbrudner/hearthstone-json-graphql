const createEnum = require("../../../lib/create-enum");
const {
	sets,
	rarities,
	cardClasses,
	types,
	mechanics,
	races,
} = require("../../../data/cards");

exports.CardClass = createEnum(cardClasses, "cardClass");
exports.Rarity = createEnum(rarities, "rarity");
exports.Set = createEnum(sets, "set");
exports.Type = createEnum(types, "type");
exports.Race = createEnum(races, "race");
exports.Mechanic = createEnum(mechanics, "mechanic");
