const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	}),
);

app.use("/docs", express.static("docs"));

app.listen(process.env.PORT || 3000);
