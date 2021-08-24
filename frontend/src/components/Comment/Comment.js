import React from "react";
import classes from "./Comment.module.css";

function Comment(props) {
	console.log(props.commentsData);

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
						name="description"
						value={"Hello"}
						onChange={() => {
							console.log("Hello world");
						}}
						placeholder="Enter Description"
					/>
				</div>
				{/* Comment end */}
				<div style={{textAlign:"right"}} >
					<button
						type="submit"
						className={classes["sub-btn"]}
						onClick={() => {
							console.log("Hello world");
						}}
					>
						comment
					</button>
				</div>
			</form>

			<div className={classes["comments"]}>{list}</div>
		</div>
	);
}

export default Comment;
