require("dotenv").config();
const express = require("express");
const busboy = require("connect-busboy");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cors());

app.use(
	busboy({
		highWaterMark: 2 * 1024 * 1024,
	})
);

// app.route("/a").get((req, res) => {
// 	res.writeHead(200, { "Content-Type": "text/html" });
// 	res.write(
// 		'<form action="upload" method="post" enctype="multipart/form-data">'
// 	);
// 	res.write('<input type="file" name="fileToUpload"><br>');
// 	res.write('<input type="submit">');
// 	res.write("</form>");
// 	return res.end();
// });

// app.options("/users", (req, res) => {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader("Access-Control-Allow-Methods", "*");
// 	res.setHeader("Access-Control-Allow-Headers", "*");
// 	res.end();
// });

require("./routes/routes.api.user").routesConfig(app);
require("./routes/routes.api.auth").routesConfig(app);
require("./routes/routes.api.video").routesConfig(app);

app.listen(process.env.PORT, () => {
	console.log("Server started at", process.env.PORT);
});
