import React, { Component } from "react";
import ReactPlayer from "react-player";
import './VideoPlayer.css';

class VideoPlayer extends Component {
	render() {

    // console.log(this.props.match.params.id);
    
		return <ReactPlayer className="player" url="http://localhost:3030/video/" controls />;
	}
}
export default VideoPlayer;
