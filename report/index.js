const fs = require("fs");
const path = require("path");

const createData = () => {
	const queries = JSON.parse(
		fs.readFileSync(path.resolve(__dirname, "..", "log.json"), "utf-8"),
	);

	return queries["graph-ql-queries"]
		.map(({ query, variables }) => {
			if (query) {
				return `<tr><td>${query}</td><td>${variables || ""}</td></tr>`;
			}
		})
		.join("");
};

module.exports = () => {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Queries</title>
		<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	</head>
	<body>
	<div class="container mt-5">
		<h1>GraphQL Queries</h1>
		<table class="table mt-5">
			<thead>
				<tr>
					<th>Query</th>
					<th>Variables</th>
				</tr>
			</thead>
			<tbody>
			${createData()}
			</tbody>
		</table>
	</div>
	</body>
	</html>`;
};
