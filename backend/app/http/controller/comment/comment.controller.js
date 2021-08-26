const CommentModel = require("../../../model/comment/comment.model");
// const IO = require("../../../services/socket.service").IO;

exports.insert = (req, res) => {
	const newComment = {
		videoId: req.body.videoId,
		userId: req.body.userId,
		content: req.body.content,
	};

	CommentModel.createComment(newComment)
		.then((result) => {
			const temp = { ...result.comment._doc };
			temp.name = req.jwt.name;
			const eventEmitter = req.app.get("eventEmitter");

			eventEmitter.emit("commentCreated", temp);

			res.status(200).send(temp);
		})
		.catch((err) => {
			res.sendStatus(500);
		});
};

exports.get = async (req, res) => {
	if (!req.query.videoId) res.sendStatus(400);
	else {
		const videoId = req.query.videoId;

		let limit =
			req.query.limit &&
			Number.isInteger(req.query.limit) &&
			req.query.limit <= 100
				? parseInt(req.query.limit)
				: 50;

		let page =
			req.query.page && Number.isInteger(req.query.page)
				? parseInt(req.query.page)
				: 0;

		const comments = await CommentModel.list(videoId, limit, page);

		res.send(comments);
	}
};
