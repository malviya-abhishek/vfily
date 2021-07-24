require("dotenv").config();
const express = require("express");
const busboy = require("connect-busboy");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use([express.static("public")]);

app.use(cors());

app.use(
	busboy({
		highWaterMark: 2 * 1024 * 1024,
	})
);

require("./routes/routes.api.user").routesConfig(app);
require("./routes/routes.api.auth").routesConfig(app);
require("./routes/routes.api.video").routesConfig(app);

app.listen(process.env.PORT, () => {
	console.log("Server started at", process.env.PORT);
});
