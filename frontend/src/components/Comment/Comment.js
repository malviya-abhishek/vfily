import React from "react";
import classes from "./Comment.module.css";

function Comment(props) {
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
				<button
					type="submit"
					className={classes["sub-btn"]}
					onClick={() => {
						console.log("Hello world");
					}}
				>
					comment
				</button>
			</form>
		</div>
	);
}

export default Comment;
