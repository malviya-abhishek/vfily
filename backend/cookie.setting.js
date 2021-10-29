exports.cookieSetter = ()=>{ 
	return {
		sameSite: "none",
		path: "/",
		secure: true,
		httpOnly: true,
		expires: new Date(new Date().getTime() + 1000*60*60*24),
	}
};
