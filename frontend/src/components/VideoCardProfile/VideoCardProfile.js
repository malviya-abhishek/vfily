import React from "react";
import classes from "./VideoCardProfile.module.css";

function VideoCardProfile(props) {
	return (
		<div className={classes.container}>
			<img className={classes["video-img"]} src="images/default.png" />

			<div className={classes.details}>
				<div> Tiel </div>
				<div> Status: Shared </div>
        <input type="radio" />
			</div>
		</div>
	);
}

export default VideoCardProfile;
