const UserModel = require("../../../model/user/user.model");
const emailChecker_utilities =
	require("../../../utilites/emailChecker.utilites").emailCheck;

exports.isVaildUserFields = async (req, res, next) => {
	if (!req.body) {
		return res.status(400).send({ error: "Body missing" });
	}

	if (
		!req.body.firstName ||
		!req.body.lastName ||
		!req.body.email ||
		!req.body.password
	) {
		let error = [];
		if (!req.body.firstName) error.push("Missing firstName field");
		if (!req.body.lastName) error.push("Missing lastName field");
		if (!req.body.email) error.push("Missing email field");
		if (!req.body.password) error.push("Missing password field");
		return res.status(400).send({ error: error.join(", ") });
	}

	// Check Invalid email
	if (emailChecker_utilities(req.body.email) === false)
		return res.status(400).send({ error: "Invalid email" });

	// Check email used
	const result = await UserModel.findByEmail(req.body.email);

	if (result.length !== 0)
		return res.status(400).send("email already user");

	next();
};
