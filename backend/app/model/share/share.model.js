const mongoose = require("../../services/mongoose.service").mongoose;
const Schema = mongoose.Schema;
const VideoModel = require("../video/video.model");

const shareSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		videoId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Video",
		},
	},
	{ timestamps: true }
);

shareSchema.set("toJSON", {
	virtuals: true,
});

shareSchema.findById = function (cb) {
	return this.model("Share").find({ id: this.id }, cb);
};

const Share = mongoose.model("Share", shareSchema);

exports.CreateShare = (videoId) => {
	// sharedId
	return new Promise((resolve, reject) => {
		VideoModel.findById(videoId)
			.then((result) => {
				if (result) {
					if (result.shared) {
						resolve({ _id: result.shareId });
					} else {
						const shareData = {
							userId: result.userId,
							videoId: result.id,
						};
						share = new Share(shareData);
						resolve(share.save());
					}
				} else reject("invalid video id");
			})
			.catch((err) => {
				reject("invalid video id");
			});
	});
};

exports.findById = (id) => {
	return Share.findById(id).then((result) => {
		result = result.toJSON();
		delete result._id;
		delete result.__v;
		return result;
	});
};
