const UserController = require("../app/http/controller/user/user.controller");
const VerifyUserMiddleware = require("../app/http/middleware/user/verify.user.middleware");
const AuthValidationMiddleware = require("../app/http/middleware/auth/auth.validation.middleware");
const AuthPermissionMiddleware = require("../app/http/middleware/auth/auth.permission.middleware");
const CookieValidationMiddleware = require("../app/http/middleware/auth/cookie.validation.middleware");


exports.routesConfig = function (app) {
	app.post("/users", [
		VerifyUserMiddleware.isVaildUserFields,
		UserController.insert,
	]);

	app.get("/users/usercookie", [
		CookieValidationMiddleware.validCookieNeeded,
		// AuthValidationMiddleware.validJWTNeeded,
		// AuthPermissionMiddleware.sameUserCanDoThisAction,
		UserController.getById,
	]);

	app.patch("/users/:userId", [
		AuthValidationMiddleware.validJWTNeeded,
		AuthPermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
		UserController.patchById,
	]);

	app.delete("/users/:userId", [
		AuthValidationMiddleware.validJWTNeeded,
		UserController.removeById,
	]);
};
