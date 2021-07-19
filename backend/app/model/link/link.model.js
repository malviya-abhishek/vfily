const mongoose = require("../../services/mongoose.service").mongoose;
const Schema = mongoose.Schema;
const VideoModel = require("../video/video.model");

const linkSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		videoId:{
      type: mongoose.Schema.Types.ObjectId,
			ref: "Video",
    }
	},
	{ timestamps: true }
);

linkSchema.set("toJSON", {
	virtuals: true,
});

const Link = mongoose.model("Link", linkSchema);

exports.CreateLink = (videoId) => {
  // sharedId
	return new Promise((resolve, reject) => {
		VideoModel.findById(videoId)
			.then((result) => {
				if (result) {
          const linkData = {
            userId: result.userId,
            videoId: result.id
          }
          link = new Link(linkData);
					resolve(link.save());
				
        } else reject("invalid video id");
			})
			.catch((err) => {
				reject("invalid video id");
			});
	});
};
  