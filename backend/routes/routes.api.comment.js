const CommentController = require("../app/http/controller/comment/comment.controller");
const VerifyUserMiddleware = require("../app/http/middleware/user/verify.user.middleware");
const AuthValidationMiddleware = require("../app/http/middleware/auth/auth.validation.middleware");
const AuthPermissionMiddleware = require("../app/http/middleware/auth/auth.permission.middleware");
const CookieValidationMiddleware = require("../app/http/middleware/auth/cookie.validation.middleware");
const CommentValidationMiddleware = require("../app/http/middleware/comment/comment.middleware");

exports.routesConfig = function (app) {
	app.post("/comments", [
		CookieValidationMiddleware.validCookieNeeded,
		CommentValidationMiddleware.isValidCommentFields,
		CommentController.insert,
	]);

	app.get("/comments", [
		CookieValidationMiddleware.validCookieNeeded,
		CommentController.get
	]);

	// app.get("/comments/:commentId", [
	// 	CookieValidationMiddleware.validCookieNeeded,
	// 	// CommentController.
	// ]);

	// app.patch("/comments/:commentId", [
	// 	CookieValidationMiddleware.validCookieNeeded,
	// 	// CommentController.
	// ]);
	// app.delete("/comments/:commentId", [
	// 	CookieValidationMiddleware.validCookieNeeded,
	// 	// CommentController.
	// ]);
};
