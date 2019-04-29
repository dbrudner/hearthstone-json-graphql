const path = require("path");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(
	"/v1",
	graphqlHTTP({
		schema: schema,
		graphiql: true
	})
);

app.use("/docs", express.static("docs"));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "/pages", "/index.html"));
});

app.listen(process.env.PORT || 3000);
