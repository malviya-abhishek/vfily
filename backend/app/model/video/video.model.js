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
    description:{
      type:String
    },
		url:{
			type:String
		}
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

exports.list = (perPage, page) => {
	return new Promise((resolve, reject) => {
		Video.find()
			.limit(perPage)
			.skip(perPage * page)
			.exec(function (err, books) {
				if (err) reject(err);
				else {
					const newVideo = [];
					books.forEach((book) => {
						book = book.toJSON();
						delete book._id;
						delete book.__v;
						newVideo.push(book);
					});
					resolve(newVideo);
				}
			});
	});
};