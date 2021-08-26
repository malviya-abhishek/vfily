import React, { useEffect, useState, useCallback } from "react";
import CommentCom from "../../components/CommentCom/CommentCom";
import axios from "axios";

import { socket } from "../../context/socket";

const endPoint = "http://localhost:3030";

function Comment(props) {
	const [comments, setComments] = useState([]);

	const [newComment, setNewComment] = useState("");

	const changeHandler = useCallback(
		(e) => {
			let t = e.target.value;
			if (t.length < 201) setNewComment(t);
		},
		[newComment]
	);

	const commentUploadHandler = useCallback(
		(e) => {
			e.preventDefault();
			if (newComment.length == 0) return;
			const data = {
				videoId: props.videoId,
				content: newComment,
			};

			axios
				.post(endPoint + "/comments", data, {
					withCredentials: true,
				})
				.then((result) => {
					// const temp = [
					// 	{
					// 		username: localStorage.getItem("name"),
					// 		content: result.data.content,
					// 		id: result.data._id,
					// 	},
					// ].concat(comments);
					// setComments(temp);
					setNewComment("");
				})
				.catch((err) => {});
		},
		[newComment, comments]
	);


	// Using as component did mount
	useEffect(() => {
		socket.emit("join", `video_${props.videoId}`);
		const commentEndPoint = endPoint + "/comments";
		axios
			.get(commentEndPoint, {
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

	return (
		<CommentCom
			newComment={newComment}
			commentUploadHandler={commentUploadHandler}
			changeHandler={changeHandler}
			commentsData={comments}
		/>
	);
}

export default Comment;
