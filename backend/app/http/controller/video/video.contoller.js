const path = require("path");
const fs = require("fs-extra");

exports.upload = (req, res) => {
	const uploadPath = path.join(__dirname, '../../../../public/video' )
	req.pipe(req.busboy);
	req.busboy.on("file", (fieldname, file, filename) => {
		filename =   Date.now() + '-' + Math.round(Math.random() * 1E9) + filename;
		const fstream = fs.createWriteStream(path.join(uploadPath, filename));
		file.pipe(fstream);
		fstream.on("close", () => {
			res.sendStatus(202);
		});
	});
};

exports.home = (req, res) =>{
	res.sendFile( path.join(__dirname, '../../../../index.html') );
}

exports.video = (req, res)=>{
	const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  const videoPath = path.join(__dirname, '../../../../public/video/bigBuck.mp4' );
  const videoSize = fs.statSync( videoPath ).size;

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
}