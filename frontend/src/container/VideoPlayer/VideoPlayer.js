import axios from "axios";
import React, { Component } from "react";
import Player from "../../components/Player/Player";
import Button from "../../components/Button/Button";
import classes from "./VideoPlayer.module.css";

class VideoPlayer extends Component {
	state = {
		list: [],
		url: null,
		title: "",
		description: "",
		thumbnailUrl: "",
		thumbnail: null,
		sharedURL: null,
		copied: false,
		logged: null,
	};

	getContent() {
		const config = {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		};

		const endpoint =
			"http://localhost:3030/videos/" +
			(this.props.shared ? "shared/" : "") +
			this.props.match.params.videoId;

		axios
			.get(endpoint, config)
			.then((result) => {
				this.setState({
					url: "http://localhost:3030/video-file/" + result.data.url,
					title: result.data.title,
					description: result.data.description,
					thumbnailUrl:
						"http://localhost:3030/images/" + result.data.thumbnail,
				});

				//-------------------------------------
				axios
					.get(this.state.thumbnailUrl, {
						...config,
						responseType: "arraybuffer",
					})
					.then((result) => {
						const base64 = btoa(
							new Uint8Array(result.data).reduce(
								(data, byte) =>
									data + String.fromCharCode(byte),
								""
							)
						);
						this.setState({ thumbnail: "data:;base64," + base64 });
					})
					.catch((err) => {
						console.log("[ERROR]", err.response);
					});
				//-------------------------------------
				
			})
			.catch((err) => {
				console.log(["ComponentDIDmount BAD"], err);
			});
	}

	componentDidMount() {
		this.setState({
			logged: localStorage.getItem("token"),
		});

		this.getContent();
	}

	CopyURL() {
		const el = document.createElement("input");
		el.value = this.state.sharedURL;
		document.body.appendChild(el);
		el.select();
		document.execCommand("copy");
		document.body.removeChild(el);
		this.setState({
			copied: true,
		});
	}

	CreateLinkHandler() {
		const data = {};

		const config = {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		};

		axios
			.post(
				`http://localhost:3030/videos/shared/${this.props.match.params.videoId}`,
				data,
				config
			)
			.then((result) => {
				this.setState({
					sharedURL: `http://localhost:3000/video/shared/${result.data.sharedId}`,
				});
			})
			.catch((err) => {});
	}

	render() {
		return (
			<div className={classes.playerBlock}>
				<Player
					title={this.state.title}
					url={this.state.url}
					description={this.state.description}
					thumbnail={this.state.thumbnail}
				/>
				{this.state.logged ? (
					<div className={classes["create-link"]}>
						<Button
							onClickHandler={this.CreateLinkHandler.bind(this)}
						>
							Create link
						</Button>
						{this.state.sharedURL ? (
							<div className={classes["shared-link"]}>
								<div className={classes.sharedURL}>
									{this.state.sharedURL}
								</div>
								<i
									onClick={this.CopyURL.bind(this)}
									className={
										this.state.copied
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
}
export default VideoPlayer;
