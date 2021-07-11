import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./VideoCard.css";

class VideoCard extends Component {
	render() {
		return (
			<Link to={`/video/${this.props.id}`} >
				<div className="card">
					<img
						className="thumbnail"
						src="./images/default.png"
						alt="Video"
					></img>
					<h3 className="title">Title Here</h3>
				</div>
			</Link>
		);
	}
}
export default VideoCard;
