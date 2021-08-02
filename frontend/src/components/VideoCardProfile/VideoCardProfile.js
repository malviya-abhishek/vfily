import React from "react";
import classes from "./VideoCardProfile.module.css";

function VideoCardProfile(props) {
	return (
		<div className={classes.container}>
			<img className={classes["video-img"]} src="images/default.png" />
			<div className={classes.details}>
				<div> Title </div>
				<div> Shared</div>
			</div>
		</div>
	);
}

export default VideoCardProfile;
