const mongoose = require("../../services/mongoose.service").mongoose;
const Schema = mongoose.Schema;

const videoSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		url: {
			type: String,
		},
		thumbnail: {
			type: String,
		},
		shared: {
			type: Boolean,
			default: false,
		},
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
	},
	{ timestamps: true }
);

videoSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

videoSchema.set("toJSON", {
	virtuals: true,
});

videoSchema.findById = function (cb) {
	return this.model("Video").find({ id: this.id }, cb);
};

const Video = mongoose.model("Video", videoSchema);

exports.findById = (id, comments = false) => {
	return Video.findById(id).then((result) => {
		result = result.toJSON();
		delete result._id;
		delete result.__v;
		if (comments == false) delete result.comments;
		return result;
	});
};

exports.findComments = (id) => {
	return Video.findById(id)
		.populate({
			path: "comments",
			model: "Comment",
			populate: {
				path: "userId",
				model: "Users",
				select: "firstName lastName",
			}
		})
		.then((result) => {
			result = result.toJSON();
			return result;
		});
};

exports.createVideo = (videoData) => {
	const video = new Video(videoData);
	return video.save();
};

exports.list = (perPage, page, userId) => {
	return new Promise((resolve, reject) => {
		Video.find({ userId: userId })
			.limit(perPage)
			.skip(perPage * page)
			.exec(function (err, videos) {
				if (err) reject(err);
				else {
					const newVideo = [];
					videos.forEach((video) => {
						video = video.toJSON();
						delete video._id;
						delete video.__v;
						newVideo.push(video);
					});
					resolve(newVideo);
				}
			});
	});
};

exports.patchVideo = (id, videoData) => {
	return Video.findOneAndUpdate(
		{
			_id: id,
		},
		videoData
	);
};

exports.pushComment = (videoId, commentId) => {
	return Video.updateOne(
		{ _id: videoId },
		{ $push: { comments: commentId } }
	);
};
