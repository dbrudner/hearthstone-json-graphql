const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const app = express();

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	}),
);

app.use("/docs", express.static("docs"));

app.listen(process.env.PORT || 3000);
