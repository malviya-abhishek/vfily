import React from "react";
import classes from "./Comment.module.css";

function Comment(props) {

	const list = [];
	props.commentsData.forEach((e, idx) => {
		list.push(
			<div key={idx} className={classes.comment}>
				{e.username}
				<div>{e.comment}</div>
			</div>
		);
	});

	return (
		<div className={classes["container"]}>
			<form>
				{/* Comment */}
				<div>
					<textarea
						className={classes["input-comment"]}
						type="textarea"
						name="comment"
						value={props.newComment}
						onChange={props.changeHandler}
						placeholder="Comment..."
					/>
				</div>
				{/* Comment end */}
				<div style={{textAlign:"right"}} >
					<button
						type="submit"
						className={classes["sub-btn"]}
						onClick={props.commentUploadHandler}
					>
						Post
					</button>
				</div>
			</form>

			<div className={classes["comments"]}>{list}</div>
		</div>
	);
}

export default Comment;
