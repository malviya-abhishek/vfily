const VideoController = require("../app/http/controller/video/video.contoller");

exports.routesConfig = function (app) {
	app.get("/", [VideoController.home]);
	app.get("/video", [VideoController.video]);
	app.post("/upload", [VideoController.upload]);
};
