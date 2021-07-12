const mongoose = require("mongoose");
const options = {
	autoIndex: false,
	poolSize: 10,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const connectWithRetry = () => {
	console.log("MongoDb connection with retry");
	mongoose
		.connect(process.env.DB_URL, options)
		.then(() => {
			console.log("MongoDb connected");
		})
		.catch((err) => {
			console.log(
				"MongoDb connection unsuccesful, retry after 5 seconds"
			);
			setTimeout(connectWithRetry, 5000);
		});
};

connectWithRetry();

exports.mongoose = mongoose;
