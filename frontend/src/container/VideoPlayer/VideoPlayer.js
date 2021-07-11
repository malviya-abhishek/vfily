import React, { Component } from "react";
import Player from "../../components/Player/Player";
import VideoCard from "../../components/VideoCard/VideoCard";

import classes from  "./VideoPlayer.module.css";


class VideoPlayer extends Component {
	state = {
		list: [],
	};

	componentDidMount() {
		const temp = [];
		for (let i = 0; i < 11; ++i) {
			temp.push(
				<VideoCard
					key={i}
					id={i}
					thumbnail="/images/default.png"
					title="title"
				/>
			);
		}
		this.setState({list:temp})
	}

	render() {
		// console.log(this.props.match.params.id);

		return (
			<div className= {classes.playerBlock}>
				<Player title="title" url="http://localhost:3030/video/" />
				<div className={classes.suggestions} >
					{this.state.list}
				</div>
			</div>
		);
	}
}
export default VideoPlayer;
