const VideoModel = require("../../../model/video/video.model");

exports.isValidCommentFields = async (req, res, next) => {
	if (!req.body) {
		return res.status(400).send({ error: "body missing" });
	}
	if (!req.body.videoId || !req.body.content) {
		let error = [];
		if (!req.body.videoId) error.push("Missing videoId");
		if (!req.body.content) error.push("Missing content");

		return res.status(400).send({ error: error });
	}

	const videoExist = await VideoModel.findById(req.body.videoId);

	if (videoExist.length === 0)
		return res.status(400).send({ error: "wrong videoId" });

	req.body.userId = req.jwt.userId;


	next();
};
