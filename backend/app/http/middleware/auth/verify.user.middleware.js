const UserModle = require("../../../model/user/user.model");
const crypto = require("crypto");

exports.hasAuthValidFeilds = (req, res, next) => {
	let error = [];

	if (req.body) {
		if (!req.body.email) error.push("Missing email field");
		if (!req.body.password) error.push("Missing password field");
		if (error.length)
			return res.status(400).send({ error: error.join(", ") });
		else return next();
	} else {
		return res
			.status(400)
			.send({ error: "Missing email and password fields" });
	}
};

exports.isPasswordAndUserMatch = (req, res, next) => {
	UserModle.findByEmail(req.body.email).then((user) => {
		if (!user[0]) {
			res.status(404).send({ error: "Wrong email or password" });
		} else {
			let passwordFeilds = user[0].password.split("$");
			let salt = passwordFeilds[0];
			let hash = crypto
				.createHmac("sha512", salt)
				.update(req.body.password)
				.digest("base64");
			if (hash === passwordFeilds[1]) {
				req.body = {
					userId: user[0]._id,
					email: user[0].email,
					permissionLevel: user[0].permissionLevel,
					provider: "email",
					name: user[0].firstName + " " + user[0].lastName,
				};
				next();
			} else {
				res.status(404).send({ error: "Wrong email or password" });
			}
		}
	});
};
