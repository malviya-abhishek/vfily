import React, { useEffect, useState } from "react";
import Player from "../../components/Player/Player";
import Button from "../../components/Button/Button";
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
		const endpoint =
			"http://localhost:3030/videos/" +
			(props.shared ? "shared/" : "") +
			props.match.params.videoId;

		axios
			.get(endpoint, { withCredentials: true })
			.then((result) => {


				setState({
					url: "http://localhost:3030/video/" + result.data.url,
					title: result.data.title,
					description: result.data.description,
					thumbnail:
						"http://localhost:3030/images/" + result.data.thumbnail,
					sharedURL:  result.data.shared ? `http://localhost:3000/video/shared/${props.match.params.videoId}` : state.sharedURL ,
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
		const data = {};
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

	return (
		<div className={classes.playerBlock}>
			<Player
				title={state.title}
				url={state.url}
				description={state.description}
				thumbnail={state.thumbnail}
			/>
			{props.logged && props.shared != true ? (
				<div className={classes["create-link"]}>
					<Button onClickHandler={CreateLinkHandler}>
						Create link
					</Button>
					{state.sharedURL ? (
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
					) : null}
				</div>
			) : null}
		</div>
	);
}

export default VideoPlayer;

