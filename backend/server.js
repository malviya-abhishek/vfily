require("dotenv").config();
const express = require("express");
const busboy = require("connect-busboy");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

// File upload middleware
app.use(
	busboy({
		highWaterMark: 2 * 1024 * 1024,
	})
);

// http://localhost:3000
//  Access to XMLHttpRequest at 'http://localhost:3030/videos' from origin 'http://localhost:3000' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'http://127.0.0.1:3000' that is not equal to the supplied origin

//  Access to XMLHttpRequest at 'http://localhost:3030/videos' from origin 'http://localhost:3000' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.

require("./routes/routes.api.user").routesConfig(app);
require("./routes/routes.api.auth").routesConfig(app);

// Cookie parser and Static file access Don't change the order
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const CookieValidationMiddleware = require("./app/http/middleware/auth/cookie.validation.middleware");
app.use([cookieParser(),CookieValidationMiddleware.validCookieNeeded, express.static("public")]);

// Don't change the order

require("./routes/routes.api.video").routesConfig(app);

app.options("/", (req, res) => {
	res.status(200).send();
});

app.listen(process.env.PORT, () => {
	console.log("Server started at", process.env.PORT);
});
