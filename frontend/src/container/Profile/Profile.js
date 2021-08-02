import React, { useState } from "react";
import axios from "axios";
import classes from "./Profile.module.css";
import VideoCardProfile from "../../components/VideoCardProfile/VideoCardProfile";

function Profile(props) {
	const [profile, setProfile] = useState({});

	return (
		<div className={classes.container}>
			<div className={classes.detail} >
				<img
					className={classes["profile-img"]}
					src="images/default_profile.png"
				/>
				<div className={classes.name}>First Name</div>
			</div>

      <div className={classes["video-container"]} >
        <VideoCardProfile  />
      </div>

		</div>
	);
}

export default Profile;
