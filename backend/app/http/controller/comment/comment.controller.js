const CommentModel = require("../../../model/comment/comment.model");

exports.insert = (req, res) => {
	const newComment = {
		videoId: req.body.videoId,
		userId: req.body.userId,
		content: req.body.content,
	};

	CommentModel.createComment(newComment)
		.then((result) => {
			res.status(200).send(result.comment);
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
