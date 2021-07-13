const VideoController = require("../app/http/controller/video/video.contoller");

exports.routesConfig = function (app) {
	app.get("/", [VideoController.home]);
	app.get("/videos", [VideoController.videos]);
	app.get("/videos/:videoId", [VideoController.videoLink]);
	app.get("/video/:videoPath", [VideoController.video]);
	app.post("/upload", [VideoController.upload]);
};

