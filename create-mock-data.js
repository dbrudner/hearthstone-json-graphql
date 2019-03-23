const fetch = require("node-fetch");
const fs = require("fs");

const fetchAndWriteToJSON = async () => {
	const response = await fetch(
		"https://api.hearthstonejson.com/v1/25770/enUS/cards.collectible.json",
	);
	const data = await response.json();

	fs.writeFileSync("./test/mock-data.json", JSON.stringify(data));
};

fetchAndWriteToJSON();
