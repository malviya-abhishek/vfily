const UserModel = require("../../../model/user/user.model");
const crypto = require("crypto");

exports.insert = (req, res) => {
	let salt = crypto.randomBytes(16).toString("base64");
	let hash = crypto
		.createHmac("sha512", salt)
		.update(req.body.password)
		.digest("base64");

	req.body.password = salt + "$" + hash;

	if (!req.body.permissionLevel) req.body.permissionLevel = 1;

	UserModel.createUser(req.body)
		.then((result) => {
			return res.status(201).send({ id: result._id });
		})
		.catch((err) => {
			return res.status(503).send({ error: "Service Unavailable" });
		});
};

exports.getById = (req, res) => {
	UserModel.findById(req.params.userId)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(500).send({ err: err });
		});
};

exports.patchById = (req, res) => {
	if (req.body.password) {
		let salt = crypto.randomBytes(16).toString("base64");
		let hash = crypto
			.createHmac("sha512", salt)
			.update(req.body.password)
			.digest("base64");
		req.body.password = salt + "$" + hash;
	}
	UserModel.patchUser(req.params.userId, req.body).then((result) => {
		res.sendStatus(204);
	});
};

exports.removeById = (req, res) => {
	UserModel.removeById(req.params.userId).then((result) => {
		res.status(204).send({});
	});
};
