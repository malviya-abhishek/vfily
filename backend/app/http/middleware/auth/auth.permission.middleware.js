require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_PERMISSION = 4069;
const VideoModel = require("../../../model/video/video.model");

exports.minimumPermissionLevelRequired = (required_permission_level) => {
	return (req, res, next) => {
		let user_permission_level = parseInt(req.jwt.permissionLevel);
		let userId = req.jwt.userId;
		if (
			user_permission_level &&
			(required_permission_level <= user_permission_level)
		)
			return next();
		else return res.status(403).send();
	};
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
	let user_permission_level = parseInt(req.jwt.permissionLevel);
	let userId = req.jwt.userId;
	if (req.params && req.params.userId && userId == req.params.userId) next();
	else {
		if (user_permission_level & ADMIN_PERMISSION) return next();
		else return res.status(403).send();
	}
};

exports.sameUserCanDoThisAction = (req, res, next) => {
	let userId = req.jwt.userId;
	if (req.params.userId === userId) return next();
	else return res.status(403).send();
};

// exports.sameUserProduct = (req, res, next) =>{
// 	let sellerId  = req.jwt.userId;
// 	let productId = req.params.bookId;
// 	BookModel.findById(productId).then((result)=>{
// 		if(result.sellerId === sellerId)
// 			next();
// 		else
// 			return res.sendStats(403);
// 	}).catch((err)=>{
// 		return res.sendStats(404);
// 	})
// }
