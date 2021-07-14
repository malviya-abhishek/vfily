const UserController = require("../app/http/controller/user/user.controller");
const VerifyUserMiddleware = require("../app/http/middleware/user/verify.user.middleware");
const AuthValidationMiddleware = require("../app/http/middleware/auth/auth.validation.middleware");
const AuthPermissionMiddleware = require("../app/http/middleware/auth/auth.permission.middleware");

const ADMIN = parseInt(process.env.ADMIN);
const CUSTOMER = parseInt(process.env.CUSTOMER);
const SELLER = parseInt(process.env.SELLER);

exports.routesConfig = function (app) {
	app.post("/users", [
		(req, res, next) => {
			console.log(req.body);

			next();
		},
		VerifyUserMiddleware.isVaildUserFields,
		UserController.insert,
	]);

	app.get("/users/:userId", [
		AuthValidationMiddleware.validJWTNeeded,
		AuthPermissionMiddleware.minimumPermissionLevelRequired(CUSTOMER),
		AuthPermissionMiddleware.sameUserCanDoThisAction,
		UserController.getById,
	]);

	app.patch("/user/:userId", [
		AuthValidationMiddleware.validJWTNeeded,
		AuthPermissionMiddleware.minimumPermissionLevelRequired(CUSTOMER),
		AuthPermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
		UserController.patchById,
	]);

	app.delete("/users/:userId", [
		AuthValidationMiddleware.validJWTNeeded,
		AuthPermissionMiddleware.minimumPermissionLevelRequired(CUSTOMER),
		UserController.removeById,
	]);
};
