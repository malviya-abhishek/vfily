const VerifyUserMiddleware = require('../app/http/middleware/auth/verify.user.middleware');
const AuthController = require('../app/http/controller/auth/auth.controller');
const AuthValidationMiddleware = require('../app/http/middleware/auth/auth.validation.middleware');
exports.routesConfig = function (app) {
	app.post("/auth", [
		VerifyUserMiddleware.hasAuthValidFeilds,
		VerifyUserMiddleware.isPasswordAndUserMatch,
		AuthController.login		
	]);
	app.post("/auth/refresh", [
		AuthValidationMiddleware.validJWTNeeded,
		AuthValidationMiddleware.verifyRefreshBodyField,
		AuthValidationMiddleware.validRefreshNeeded,
		AuthController.login
	]);
};
