const path = require("path");
const fs = require("fs-extra");
const VideoModel = require("../../../model/video/video.model");

exports.upload = (req, res) => {

	console.log("[upload]", req);

	const uploadPath = path.join(__dirname, "../../../../public/video");
	req.pipe(req.busboy);

	req.busboy.on("file", (fieldname, file, filename) => {
		filename =
			Date.now() + "-" + Math.round(Math.random() * 1e9) + filename;
		const fstream = fs.createWriteStream(path.join(uploadPath, filename));
		file.pipe(fstream);
		fstream.on("close", () => {
			VideoModel.createVideo({
				title: "name",
				description: "this is a video",
				url: filename,
			})
				.then((result) => {
					res.sendStatus(202);
				})
				.catch((err) => {
					res.sendStatus(500);
				});
		});
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
	VideoModel.list(limit, page).then((result) => {
		res.status(200).send(result);
	});
};

exports.home = (req, res) => {
	res.sendFile(path.join(__dirname, "../../../../index.html"));
};

exports.video = (req, res) => {

	console.log("[Video link]", req.params);


	const range = req.headers.range;
	
	if (!range) {
		res.status(400).send("Requires Range header");
	}

	const videoPath = path.join(__dirname, req.params.videoPath)

	// __dirname, '../../../../public/video/1626031130139-991020255MISSION IMPOSSIBLE 5  (HOLLY).mkv'
	

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
			return res.send( result );
		})
		.catch((err) => {
			return res.sendStatus(404);
		});
};
