const express = require("express");
const busboy = require("connect-busboy");


const app = express();

app.use(express.static('public'))

app.use(
	busboy({
		highWaterMark: 2 * 1024 * 1024,
	})
);


app.route("/a").get((req, res) => {
	res.writeHead(200, { "Content-Type": "text/html" });
	res.write(
		'<form action="upload" method="post" enctype="multipart/form-data">'
	);
	res.write('<input type="file" name="fileToUpload"><br>');
	res.write('<input type="submit">');
	res.write("</form>");
	return res.end();
});

require('./routes/routes.api.video').routesConfig(app);


app.listen(3030, () => {
	console.log("Server started");
});
