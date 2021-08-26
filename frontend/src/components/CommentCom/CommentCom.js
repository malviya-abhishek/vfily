import React from "react";
import classes from "./CommentCom.module.css";

function CommentCom(props) {

	const list = [];
	props.commentsData.forEach((e) => {
		list.push(
			<div key={e.id} className={classes.comment}>
				{e.username}
				<div>{e.content}</div>
			</div>
		);
	});

	return (
		<div className={classes["container"]}>
			<form>
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

export default CommentCom;
