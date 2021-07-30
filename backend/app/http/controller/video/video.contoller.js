const path = require("path");
const fs = require("fs-extra");
const VideoModel = require("../../../model/video/video.model");
const LinkModel = require("../../../model/link/link.model");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

exports.upload = (req, res) => {
	const newVideo = {};

	req.pipe(req.busboy);

	req.busboy.on("field", (fieldname, value) => {
		newVideo[fieldname] = value;
	});

	req.busboy.on("file", (fieldname, file, filename) => {
		if (fieldname === "thumbnail") {
			const uploadPath = path.join(
				__dirname,
				"../../../../public/images"
			);

			filename =
				Date.now() + "-" + Math.round(Math.random() * 1e9) + filename;

			const fstream = fs.createWriteStream(
				path.join(uploadPath, filename)
			);

			file.pipe(fstream);
			fstream.on("close", () => {
				newVideo.userId = req.jwt.userId;
				newVideo.thumbnail = filename;
			});
		} else {
			const uploadPath = path.join(__dirname, "../../../../public/video");

			filename =
				Date.now() + "-" + Math.round(Math.random() * 1e9) + filename;
			const fstream = fs.createWriteStream(
				path.join(uploadPath, filename)
			);

			file.pipe(fstream);
			fstream.on("close", () => {
				newVideo.url = filename;

				VideoModel.createVideo(newVideo)
					.then((result) => {
						res.sendStatus(202);
					})
					.catch((err) => {
						res.sendStatus(500);
					});
			});
		}
	});
};

exports.videos = (req, res) => {
	let limit =
		req.query.limit && req.query.limit <= 100
			? parseInt(req.query.limit)
			: 10;
	let page = 0;
	if (req.query) {
		if (req.query.page) {
			req.query.page = parseInt(req.query.page);
			page = Number.isInteger(req.query.page) ? req.query.page : 0;
		}
	}
	VideoModel.list(limit, page, req.jwt.userId).then((result) => {
		res.status(200).send(result);
	});
};

exports.home = (req, res) => {
	res.sendFile(path.join(__dirname, "../../../../index.html"));
};

exports.video = (req, res) => {
	const range = req.headers.range;

	if (!range) {
		res.status(400).send("Requires Range header");
	}

	const videoPath = path.join(
		__dirname,
		"../../../../public/video",
		req.params.videoPath
	);

	const videoSize = fs.statSync(videoPath).size;

	const CHUNK_SIZE = 10 ** 6; // 1MB
	const start = Number(range.replace(/\D/g, ""));
	const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

	const contentLength = end - start + 1;

	const headers = {
		"Content-Range": `bytes ${start}-${end}/${videoSize}`,
		"Accept-Ranges": "bytes",
		"Content-Length": contentLength,
		"Content-Type": "video/mp4",
	};

	res.writeHead(206, headers);

	const videoStream = fs.createReadStream(videoPath, { start, end });

	videoStream.pipe(res);
};

exports.videoLink = (req, res) => {
	VideoModel.findById(req.params.videoId)
		.then((result) => {
			return res.send(result);
		})
		.catch((err) => {
			return res.sendStatus(404);
		});
};

exports.sharedPost = (req, res) => {
	LinkModel.CreateLink(req.params.videoId)
		.then((result) => {
			res.send({ sharedId: result._id });
		})
		.catch((err) => {
			res.send({ err: "invalid video id" });
		});
};

exports.sharedGet = (req, res) => {
	let token = jwt.sign(req.body, JWT_SECRET);
	LinkModel.findById(req.params.sharedId)
		.then((result) => {
			if (result) {
				VideoModel.findById(result.videoId)
					.then((result) => {
						return res.status(202)
							.cookie("token", token, {
								sameSite: "strict",
								path: "/",
								expires: new Date(
									new Date().getTime() + 100 * 1000
								),
								httpOnly: true,
							})
							.send(result);
					})
					.catch((err) => {
						return res.sendStatus(404);
					});
			} else return res.sendStatus(404);
		})
		.catch((err) => {
			return res.sendStatus(404);
		});
};
