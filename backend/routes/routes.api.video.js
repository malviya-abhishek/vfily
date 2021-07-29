const VideoController = require("../app/http/controller/video/video.contoller");
const AuthValidationMiddleware = require("../app/http/middleware/auth/auth.validation.middleware");
const AuthPermissionMiddleware = require("../app/http/middleware/auth/auth.validation.middleware");
const CookieValidationMiddleware = require("../app/http/middleware/auth/cookie.validation.middleware");

exports.routesConfig = function (app) {
	// app.get("/", [VideoController.home]);
	app.get("/videos", [
		// AuthValidationMiddleware.validJWTNeeded,
		CookieValidationMiddleware.validCookieNeeded,
		VideoController.videos,
	]);

	app.get("/videos/:videoId", [
		AuthValidationMiddleware.validJWTNeeded,
		VideoController.videoLink,
	]);

	app.get("/video/:videoPath", [VideoController.video]);

	app.post("/upload", [
		AuthValidationMiddleware.validJWTNeeded,
		VideoController.upload,
	]);

	app.post("/videos/shared/:videoId", [
		AuthValidationMiddleware.validJWTNeeded,
		VideoController.sharedPost
	]);
	app.get("/videos/shared/:sharedId",[
		VideoController.sharedGet
	])
};
