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
		thumbnail: "",
		shareLink: null,
	};

	componentDidMount() {

		const config = {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		};

		axios
			.get(
				`http://localhost:3030/videos/${this.props.match.params.videoId}`,config
			)
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

	CreateLinkHandler() {

		const data = {}

		const config = {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		};


		axios
			.post(
				`http://localhost:3030/video/shared/${this.props.match.params.videoId}12`,
				data,
				config
			)
			.then((result) => {
				console.log(result);
				this.setState({
					shareLink: true,
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
				<div className={classes["create-link"]}>
					<Button onClickHandler={this.CreateLinkHandler.bind(this)}>
						{" "}
						Create link{" "}
					</Button>
					{this.state.shareLink ? (
						<div className={classes["shared-link"]}>
							{" "}
							http://localhost:3000/video/shared/60f5beb5a3df557661833595{" "}
						</div>
					) : null}
				</div>
			</div>
		);
	}
}
export default VideoPlayer;

//
