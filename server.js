const path = require("path");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const get = require("lodash/get");
const fs = require("fs");
const report = require("./report");

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/report", (req, res) => {
	res.send(report(log));
});

const log = [];

app.get("/log", async (req, res) => {
	res.json({ log });
});

app.use(
	"/v1",
	graphqlHTTP(async function(req) {
		const query = get(req, "body.query");
		const variables = get(req, "body.variables");

		log.push({ query, variables });

		return { schema: schema, graphiql: true };
	}),
);

app.use("/docs", express.static("docs"));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "/pages", "/index.html"));
});

app.listen(process.env.PORT || 3000);
