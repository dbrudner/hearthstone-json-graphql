const { cards } = require("../../../test/mock-data");
const query = require(".");

describe("query", () => {
	it("should have cards", () => {
		expect(cards).toBeTruthy();
	});
});

describe("full query with real data", () => {
	it("should filter cards", () => {
		const expected = query(cards, { filter: { name: "Azure Drake" } });

		expect(expected.length).toBe(1);
	});

	it("should pass test case with real data", () => {
		const actual = [
			{
				artist: "Mauricio Herrera",
				attack: 3,
				cardClass: "WARRIOR",
				collectible: true,
				cost: 5,
				dbfId: 48542,
				flavor: "Star player on the inter-office Boomball team.",
				health: 4,
				id: "BOT_104",
				mechanics: ["BATTLECRY"],
				name: "Dyn-o-matic",
				race: "MECHANICAL",
				rarity: "RARE",
				set: "BOOMSDAY",
				text:
					"<b>Battlecry:</b> Deal 5 damage randomly split among all minions except Mechs.",
				type: "MINION",
			},
			{
				artist: "Matt Dixon",
				attack: 2,
				cardClass: "NEUTRAL",
				collectible: true,
				cost: 5,
				dbfId: 40803,
				elite: true,
				flavor: "The last true master of Finjitsu.",
				health: 4,
				id: "CFM_344",
				mechanics: ["STEALTH", "TRIGGER_VISUAL"],
				name: "Finja, the Flying Star",
				race: "MURLOC",
				rarity: "LEGENDARY",
				set: "GANGS",
				text:
					"[x]<b>Stealth</b>\n   Whenever this attacks and   \nkills a minion, summon 2\n Murlocs from your deck.",
				type: "MINION",
			},
			{
				artist: "Zoltan Boros",
				attack: 3,
				cardClass: "PALADIN",
				collectible: true,
				cost: 5,
				dbfId: 47051,
				flavor: "Maybe we should have called him Ghostly Rusher.",
				health: 4,
				id: "GIL_545",
				mechanics: ["DIVINE_SHIELD", "RUSH"],
				name: "Ghostly Charger",
				rarity: "COMMON",
				set: "GILNEAS",
				text: "<b>Divine Shield</b>\n<b>Rush</b>",
				type: "MINION",
			},
			{
				artist: "James Ryman",
				attack: 2,
				cardClass: "DRUID",
				collectible: true,
				cost: 5,
				dbfId: 45859,
				elite: true,
				flavor:
					"We suggest crafting Ixlid; he'll grow on you. Literally.",
				health: 4,
				id: "LOOT_329",
				mechanics: ["TRIGGER_VISUAL"],
				name: "Ixlid, Fungal Lord",
				rarity: "LEGENDARY",
				set: "LOOTAPALOOZA",
				text: "After you play a minion, summon a copy of it.",
				type: "MINION",
			},
			{
				artist: "Efrem Palacios",
				attack: 3,
				cardClass: "ROGUE",
				collectible: true,
				cost: 5,
				dbfId: 41217,
				flavor: "'Cause slayers gonna slay, slay, slay, slay, slay.",
				health: 4,
				id: "UNG_064",
				mechanics: ["COMBO"],
				name: "Vilespine Slayer",
				playRequirements: {
					REQ_MINION_TARGET: 0,
					REQ_TARGET_FOR_COMBO: 0,
				},
				rarity: "EPIC",
				set: "UNGORO",
				targetingArrowText: "Destroy a minion.",
				text: "<b>Combo:</b> Destroy a minion.",
				type: "MINION",
			},
		];

		const expected = query(cards, {
			filter: {
				name: "a",
				attack: { isLessThan: 4 },
				health: { isEqualTo: 4 },
				cost: { isEqualTo: 5 },
			},
		});

		expect(actual).toEqual(expected);
	});
});
