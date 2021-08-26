import React, { useEffect, useState } from "react";
import Player from "../../components/Player/Player";
import Button from "../../components/Button/Button";
import Comment from "../../components/Comment/Comment";
import classes from "./VideoPlayer.module.css";
import axios from "axios";
axios.defaults.withCredentials = true;

function VideoPlayer(props) {
	const [state, setState] = useState({
		url: null,
		title: "",
		description: "",
		thumbnail: "",
		sharedURL: null,
		copied: false,
	});

	const [comments, setComments] = useState([]);

	const [newComment, setNewComment] = useState("");

	function changeHandler(e) {
		let t = e.target.value;
		if (t.length < 201) setNewComment(t);
	}

	function commentUploadHandler(e) {
		e.preventDefault();
		if (newComment.length == 0) return;
		const data = {
			videoId: props.match.params.videoId,
			content: newComment,
		};
		axios
			.post(`http://localhost:3030/comments`, data, {
				withCredentials: true,
			})
			.then((result) => {
				console.log(result);
				const temp = [
					{
						username: localStorage.getItem("name"),
						content: result.data.content,
					},
				].concat(comments);
				setComments(temp);
				setNewComment("");
			})
			.catch((err) => {});
	}

	useEffect(() => {
		const basePoint = "http://localhost:3030";

		const videoEndPoint =
			basePoint +
			"/videos/" +
			(props.shared ? "shared/" : "") +
			props.match.params.videoId;

		axios
			.get(videoEndPoint, { withCredentials: true })
			.then((result) => {
				setState({
					url: "http://localhost:3030/video/" + result.data.url,
					title: result.data.title,
					description: result.data.description,
					thumbnail:
						"http://localhost:3030/images/" + result.data.thumbnail,
					sharedURL: result.data.shared
						? `http://localhost:3000/video/shared/${props.match.params.videoId}`
						: state.sharedURL,
					copied: state.copied,
				});
			})
			.catch((err) => {
				console.log(["ComponentDIDmount BAD"], err);
			});

		const commentEndPoint = basePoint + "/comments";
		axios
			.get(commentEndPoint, {
				withCredentials: true,
				params: {
					videoId: props.match.params.videoId,
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
				console.log(err.body);
			});
	}, [props.logged]);

	function CopyURL() {
		const el = document.createElement("input");
		el.value = state.sharedURL;
		document.body.appendChild(el);
		el.select();
		document.execCommand("copy");
		document.body.removeChild(el);
		setState({
			...state,
			copied: true,
		});
	}

	function CreateLinkHandler() {
		const data = { shared: true };
		axios
			.post(
				`http://localhost:3030/videos/shared/${props.match.params.videoId}`,
				data,
				{ withCredentials: true }
			)
			.then((result) => {
				setState({
					...state,
					sharedURL: `http://localhost:3000/video/shared/${result.data.sharedId}`,
				});
			})
			.catch((err) => {});
	}

	function DeleteLinkHandler() {
		const data = { shared: false };
		axios
			.post(
				`http://localhost:3030/videos/shared/${props.match.params.videoId}`,
				data,
				{ withCredentials: true }
			)
			.then((result) => {
				setState({
					...state,
					sharedURL: null,
					copied: false,
				});
			})
			.catch((err) => {});
	}

	return (
		<div className={classes.playerBlock}>
			<span className={classes.video}>
				<Player
					title={state.title}
					url={state.url}
					description={state.description}
					thumbnail={state.thumbnail}
				/>
			</span>

			{props.logged && props.shared !== true ? (
				<div className={classes["create-link"]}>
					{state.sharedURL ? (
						<>
							<Button
								danger={true}
								onClickHandler={DeleteLinkHandler}
							>
								Delete Link
							</Button>

							<div className={classes["shared-link"]}>
								<div className={classes.sharedURL}>
									{state.sharedURL}
								</div>
								<i
									onClick={CopyURL}
									className={
										state.copied
											? "fas fa-check-double"
											: "far fa-copy"
									}
								></i>
							</div>
						</>
					) : (
						<Button onClickHandler={CreateLinkHandler}>
							Share link
						</Button>
					)}
				</div>
			) : <span></span>}

			{props.logged ? (
				<div className={classes["comments"]}>
					<Comment
						newComment={newComment}
						commentUploadHandler={commentUploadHandler}
						changeHandler={changeHandler}
						commentsData={comments}
					/>
				</div>
			) : null}

		</div>
	);
}

export default VideoPlayer;
