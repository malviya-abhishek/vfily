const VideoController = require("../app/http/controller/video/video.contoller");
const AuthValidationMiddleware = require("../app/http/middleware/auth/auth.validation.middleware");
const AuthPermissionMiddleware = require("../app/http/middleware/auth/auth.validation.middleware");

exports.routesConfig = function (app) {
	// app.get("/", [VideoController.home]);
	app.get("/videos", [
		AuthValidationMiddleware.validJWTNeeded,
		VideoController.videos,
	]);
	app.get("/videos/:videoId", [VideoController.videoLink]);
	app.get("/video/:videoPath", [VideoController.video]);
	app.post("/upload", [
		AuthValidationMiddleware.validJWTNeeded,
		VideoController.upload,
	]);
};
