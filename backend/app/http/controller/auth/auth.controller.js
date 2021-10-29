require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const crypto = require("crypto");
const uuid = require("uuid");

const cookieSetter = require("../../../../cookie.setting").cookieSetter;

exports.login = (req, res) => {
	try {
		let refreshId = req.body.userId + JWT_SECRET;
		let salt = crypto.randomBytes(16).toString("base64");

		let hash = crypto
			.createHmac("sha512", salt)
			.update(refreshId)
			.digest("base64");

		req.body.refreshKey = salt;

		let token = jwt.sign(req.body, JWT_SECRET);

		let b = Buffer.from(hash);

		let refresh_token = b.toString("base64");

		return res
			.status(202)
			.cookie("token", token, cookieSetter())
			.send({ ...req.body });
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};

exports.logout = (req, res) => {
	return res.status(202).clearCookie("token").send("cookies cleared");
};
