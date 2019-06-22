const path = require("path");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const get = require("lodash/get");
const fs = require("fs");

app.use(cors());
app.use(bodyParser());

app.use("*", async (req, res, next) => {
	next();

	const query = get(req, "body.query");
	const variables = get(req, "body.variables");

	const oldLogs = await JSON.parse(fs.readFileSync("./log.json"));
	const newLogs = await [
		{ query, variables },
		...oldLogs["graph-ql-queries"],
	];

	fs.writeFileSync(
		"./log.json",
		JSON.stringify({ "graph-ql-queries": newLogs }),
	);
});

app.use(
	"/v1",
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	}),
);

app.use("/docs", express.static("docs"));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "/pages", "/index.html"));
});

app.listen(process.env.PORT || 3000);
