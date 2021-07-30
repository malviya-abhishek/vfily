import React, { Component } from "react";
import Player from "../../components/Player/Player";
import Button from "../../components/Button/Button";
import classes from "./VideoPlayer.module.css";
import axios from "axios";
axios.defaults.withCredentials = true;

class VideoPlayer extends Component {
	state = {
		list: [],
		url: null,
		title: "",
		description: "",
		thumbnail: "",
		sharedURL: null,
		copied: false,
		logged: null,
	};

	componentDidMount() {


		this.setState({
			logged: this.props.logged,
		});

		const endpoint =
			"http://localhost:3030/videos/" +
			(this.props.shared ? "shared/" : "") +
			this.props.match.params.videoId;

		axios
			.get(endpoint, { withCredentials: true })
			.then((result) => {
				this.setState({
					url: "http://localhost:3030/video/" + result.data.url,
					title: result.data.title,
					description: result.data.description,
					thumbnail:
						"http://localhost:3030/images/" + result.data.thumbnail,
				});
			})
			.catch((err) => {
				console.log(["ComponentDIDmount BAD"], err);
			});
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

// http://localhost:3000/videos/60f5beb5a3df557661833595
