if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const path = require("path");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const get = require("lodash/get");
const fs = require("fs");
const nodemailer = require("nodemailer");

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post("/report", async (req, res) => {
	const { emailAddress } = req.body;

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.U,
			pass: process.env.P,
		},
	});

	transporter.sendMail(
		{
			from: process.env.U,
			to: emailAddress,
			subject: "Queries bro",
			attachments: [
				{
					filename: "queries.json",
					contentType: "applicaton/json",
					content: await fs.readFileSync("./log.json", "utf-8"),
				},
			],
		},
		(err, info) => {
			if (err) {
				res.json(err);
			} else {
				res.json(info);
			}
		},
	);
});

app.use(
	"/v1",
	graphqlHTTP(async function(req) {
		const query = get(req, "body.query");
		const variables = get(req, "body.variables");
		const oldLogs = await fs.readFileSync("./log.json", "utf-8");

		fs.writeFileSync(
			"./log.json",
			JSON.stringify({
				"graph-ql-queries": await [
					{ query, variables },
					...JSON.parse(oldLogs)["graph-ql-queries"],
				],
			}),
		);

		return { schema: schema, graphiql: true };
	}),
);

app.use("/docs", express.static("docs"));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "/pages", "/index.html"));
});

app.listen(process.env.PORT || 3000);
