const VideoController = require("../app/http/controller/video/video.contoller");
const AuthValidationMiddleware = require("../app/http/middleware/auth/auth.validation.middleware");
const AuthPermissionMiddleware = require("../app/http/middleware/auth/auth.permission.middleware");
const CookieValidationMiddleware = require("../app/http/middleware/auth/cookie.validation.middleware");

exports.routesConfig = function (app) {
	app.get("/videos", [
		CookieValidationMiddleware.validCookieNeeded,
		VideoController.videos,
	]);

	app.get("/videos/:videoId", [
		CookieValidationMiddleware.validCookieNeeded,
		VideoController.videoLink,
	]);

	app.get("/video/:videoPath", [
		CookieValidationMiddleware.validCookieNeeded,
		VideoController.video,
	]);

	app.post("/upload", [
		CookieValidationMiddleware.validCookieNeeded,
		// AuthValidationMiddleware.validJWTNeeded,
		VideoController.upload,
	]);

	app.post("/videos/shared/:videoId", [
		// AuthValidationMiddleware.validJWTNeeded,
		CookieValidationMiddleware.validCookieNeeded,
		VideoController.sharedPost,
	]);
	app.get("/videos/shared/:videoId", [VideoController.sharedGet]);
};

