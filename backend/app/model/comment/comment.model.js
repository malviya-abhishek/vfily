const mongoose = require("../../services/mongoose.service").mongoose;
const Schema = mongoose.Schema;
const VideoModel = require("../video/video.model");

const commentSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		videoId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Video",
		},

		content: {
			type: String,
		},
	},
	{ timestamps: true }
);

commentSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

commentSchema.set("toJSON", {
	virtuals: true,
});

commentSchema.findById = function (cb) {
	return this.model("Comment").find({ id: this.id }, cb);
};

const Comment = mongoose.model("Comment", commentSchema);

exports.findById = (id) => {
	return Video.findById(id).then((result) => {
		result = result.toJSON();
		delete result._id;
		delete result.__v;
		return result;
	});
};

exports.createComment = async (commentData) => {
	const comment = new Comment(commentData);
	const savedComment = await comment.save();
	const pushedComment = await VideoModel.pushComment(
		savedComment.videoId,
		savedComment._id
	);

	return { comment: savedComment, pushedStatus: pushedComment };
};

// perPage, page, userId
exports.list = async (videoId, limit, page) => {
	const videoData = await VideoModel.findComments(videoId, true);
	const comments = videoData.comments;
	comments.reverse();

	return comments;
};

exports.patchComment = (id, commentData) => {
	return Comment.findOneAndUpdate(
		{
			_id: id,
		},
		commentData
	);
};
