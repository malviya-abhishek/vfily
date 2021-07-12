const mongoose = require("../../services/mongoose.service").mongoose;
const Schema = mongoose.Schema;

const videoSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		name: {
			type: String,
		},
    description:{
      type:String
    },
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
	return this.model("Users").find({ id: this.id }, cb);
};

const Video = mongoose.model("Video", videoSchema);

exports.findById = (id) => {
	return Video.findById(id).then((result) => {
		result = result.toJSON();
		delete result._id;
		delete result.__v;
		return result;
	});
};

exports.createVideo = (videoData) => {
	const video = new Video(videoData);
	return video.save();
};