import axios from "axios";
import React, { Component } from "react";
import Player from "../../components/Player/Player";

import classes from "./VideoPlayer.module.css";

class VideoPlayer extends Component {
	state = {
		list: [],
		url: null,
		title: "",
		description:"",
		thumbnail:""
	};

	componentDidMount() {
		axios
			.get(
				`http://localhost:3030/videos/${this.props.match.params.videoId}`
			)
			.then((result) => {
				
				this.setState({
					url: "http://localhost:3030/video/" + result.data.url,
					title: result.data.title,
					description: result.data.description,
					thumbnail: "http://localhost:3030/images/" + result.data.thumbnail
				});
			})
			.catch((err) => {
				console.log(["ComponentDIDmount BAD"], err);
			});
	}

	render() {
		return (
			<div className={classes.playerBlock}>
				<Player title={this.state.title} url={this.state.url} description={this.state.description} thumbnail={this.state.thumbnail} />
				<div className={classes["create-link"]}>create link</div>
			</div>
		);
	}
}
export default VideoPlayer;

// const temp = [];
// for (let i = 0; i < 11; ++i) {
// 	temp.push(
// 		<VideoCard
// 			key={i}
// 			id={i}
// 			thumbnail="/images/default.png"
// 			title="title"
// 		/>
// 	);
// }
// this.setState({list:temp})

// axios
// .get(`localhost:3030/videos/${this.props.match.params.videoId}`)
// .then((result) => {
// 	// this.setState({url:result.data.url})
// 	// url= { `http://localhost:3030/video/${this.state.url}` }
// 	console.log(["ComponentDIDmount"], result);
// })
// .catch((err) => {});

// this.setState({url:result.data.url})
// url= { `http://localhost:3030/video/${this.state.url}` }
