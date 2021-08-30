import React, { useEffect, useState } from "react";
import Player from "../../components/Player/Player";
import Comment from "../Comment/Comment";
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
			{/* Player */}

			<div>
				<span className={classes["video"]}>
					<Player
						title={state.title}
						url={state.url}
						description={state.description}
						thumbnail={state.thumbnail}
					/>
				</span>
				{/* Player End */}

				{/* Share */}

				{props.logged && props.shared !== true ? (
					<div className={classes["shareable"]}>
						<div className={classes["create-link"]}>

							<button
								className={classes["share-btn"]}
								onClick={
									state.sharedURL
										? DeleteLinkHandler
										: CreateLinkHandler
								}
							>
								<i
									className={
										state.sharedURL
											? "fas fa-trash-alt"
											: "fas fa-share-alt"
									}
								></i>
							</button>

							{/* {state.sharedURL ? ( */}

								<div style={ state.sharedURL ? { display:"grid" } : {display:"none"} }  className={classes["shared-link"]}>
									<div className={classes["sharedURL"]}>
										{state.sharedURL}
									</div>

									<button
										className={classes["share-i"]}
										onClick={CopyURL}
									>
										<i
											className={"far fa-copy"}
											style={{ fontSize: "large" }}
										></i>
									</button>
								</div>
							{/* ) : null} */}

						</div>
					</div>
				) : null}
				{/* Share end */}

				{/* Comments*/}
				{props.logged ? (
					<div className={classes["comments"]}>
						<Comment videoId={props.match.params.videoId} />
					</div>
				) : null}
				{/* Comments end */}
			</div>

			<span></span>
		</div>
	);
}

export default VideoPlayer;
