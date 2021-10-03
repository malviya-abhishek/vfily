var now = new Date();
now.setTime(now.getTime() + 1 * 3600 * 1000*1000);

exports.cookieSetting = {
	sameSite: "none",
	path: "/",
	secure: true,
	httpOnly: true,
	expires: now.toUTCString()
};
