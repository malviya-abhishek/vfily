const VerifyUserMiddleware = require("../app/http/middleware/auth/verify.user.middleware");
const AuthController = require("../app/http/controller/auth/auth.controller");
const AuthValidationMiddleware = require("../app/http/middleware/auth/auth.validation.middleware");
const CookieValidationMiddleware = require("../app/http/middleware/auth/cookie.validation.middleware");

exports.routesConfig = function (app) {
	app.post("/auth", [
		VerifyUserMiddleware.hasAuthValidFeilds,
		VerifyUserMiddleware.isPasswordAndUserMatch,
		AuthController.login,
	]);
	app.get("/auth/logout", [
		CookieValidationMiddleware.validCookieNeeded,
		AuthController.logout,
	]);
	// app.post("/auth/refresh", [
	// 	AuthValidationMiddleware.validJWTNeeded,
	// 	AuthValidationMiddleware.verifyRefreshBodyField,
	// 	AuthValidationMiddleware.validRefreshNeeded,
	// 	AuthController.login,
	// ]);
};
