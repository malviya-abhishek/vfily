import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./Profile.module.css";
import VideoCardProfile from "../../components/VideoCardProfile/VideoCardProfile";

const endpoint = "http://localhost:3030/users/usercookie";
function Profile(props) {
	const [user, setUser] = useState({});
	const [videos, setVideos] = useState([]);

	function DeleteLinkHandler(id) {
		const data = { shared: false };
		axios
			.post(`http://localhost:3030/videos/shared/${id}`, data, {
				withCredentials: true,
			})
			.then((result) => {})
			.catch((err) => {});
	}

	function CreateLinkHandler(id) {
		const data = {shared: true};
		axios
			.post(
				`http://localhost:3030/videos/shared/${id}`,
				data,
				{ withCredentials: true }
			)
			.then((result) => {
			})
			.catch((err) => {});
	}

	useEffect(() => {
		axios
			.get(endpoint, { withCredentials: true })
			.then((result) => {
				setUser(result.data.user);
				const temp = [];
				result.data.videos.forEach((element) => {
					temp.push(
						<VideoCardProfile
							key={element.id}
							DeleteLinkHandler={(id) => DeleteLinkHandler(id)}
							CreateLinkHandler={(id)=>CreateLinkHandler(id)}
							id={element.id}
							shared={element.shared}
							thumbnail={
								"http://localhost:3030/images/" +
								element.thumbnail
							}
							title={element.title}
						/>
					);
				});
				setVideos(temp);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className={classes.container}>
			<div className={classes.detail}>
				<img
					className={classes["profile-img"]}
					src="images/default_profile.png"
					alt=""
				/>
				<div className={classes.name}>{user.firstName}</div>
			</div>

			<div className={classes["video-container"]}>{videos}</div>
		</div>
	);
}

export default Profile;
