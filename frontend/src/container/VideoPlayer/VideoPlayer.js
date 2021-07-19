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
		sharedId: null,
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
				`http://localhost:3030/video/shared/${this.props.match.params.videoId}`,
				data,
				config
			)
			.then((result) => {
				this.setState({
					sharedId: `http://localhost:3030/video/shared/${result.data.sharedId}` ,
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
					{this.state.sharedId ? (
						<div className={classes["shared-link"]}>
							{this.state.sharedId}
						</div>
					) : null}
				</div>
			</div>
		);
	}
}
export default VideoPlayer;

