import React, { useEffect, useState, useCallback } from "react";
import classes from "./Comment.module.css";
import { socket } from "../../context/socket";

import axios from "../../axios/index";



function Comment(props) {
	const [comments, setComments] = useState([]);

	const [newComment, setNewComment] = useState("");

	const changeHandler = useCallback(
		(e) => {
			let t = e.target.value;
			if (t.length < 201) setNewComment(t);
		},
		[] // newComment
	);

	const commentUploadHandler = useCallback(
		(e) => {
			e.preventDefault();
			if (newComment.length === 0) return;
			const data = {
				videoId: props.videoId,
				content: newComment,
			};

			axios
				.post( "/comments", data, {
					withCredentials: true,
				})
				.then((result) => {
					setNewComment("");
				})
				.catch((err) => {});
		},
		[newComment, comments]
	);

	// Using as component did mount
	useEffect(() => {
		socket.emit("join", `video_${props.videoId}`);
		axios
			.get("/comments", {
				withCredentials: true,
				params: {
					videoId: props.videoId,
				},
			})
			.then((result) => {
				const temp = [];
				result.data.forEach((e) => {
					temp.push({
						id: e.id,
						username: e.userId.firstName,
						content: e.content,
					});
				});
				setComments(temp);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		socket.on("commentCreated", (data) => {
			const temp = [
				{
					username: data.name,
					content: data.content,
					id: data._id,
				},
				...comments,
			];
			setComments(temp);
		});
	}, [comments]);

	const list = [];
	comments.forEach((e) => {
		list.push(
			<div key={e.id} className={classes.comment}>
				{e.username} 
				<div style={{paddingTop:"2px"}} >{e.content}</div>
			</div>
		);
	});

	return (
		<div className={classes["container"]}>
			{/* Input form for comment */}

			<form className={classes["wrapper"]}>

				<textarea
					className={classes["input-comment"]}
					type="textarea"
					name="comment"
					value={newComment}
					onChange={changeHandler}
					placeholder="Comment..."
				/>

				<button
					type="submit"
					className={classes["post-btn"]}
					onClick={commentUploadHandler}
				>
					<i
						className="far fa-paper-plane"
						style={{ fontSize: "2em" }}
					></i>
				</button>
			</form>

			{/* Input form for comment end */}

			{/* List of comments */}
			<div className={classes["comments"]}>{list}</div>
			{/* List of comments end */}
		</div>
	);
}

export default Comment;
