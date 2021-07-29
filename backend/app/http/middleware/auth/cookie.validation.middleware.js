require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

exports.validCookieNeeded = (req, res, next) => {

	console.log("[ Cookie needed ]",  req.cookies);

	if (req.cookies && req.cookies.token) {
		try {
			req.jwt = jwt.verify(req.cookies.token, JWT_SECRET);
			return next();
		} catch (err) {
			return res.status(401).send();
		}
	} else {
		return res.status(401).send();
	}
};