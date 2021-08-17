import React, { useEffect, useState } from "react";
import VideoCard from "../../components/VideoCard/VideoCard";
import classes from "./VideoPallet.module.css";
import PleaseLogin from "../../components/Pleaselogin/PleaseLogin";
import axios from "axios";
import config from "./../../config";

axios.defaults.withCredentials = true;

const endpoint = "http://localhost:3030/videos";
// const endpoint = config.API_URL;

function VideoPallet(props) {
	const [list, setList] = useState([]);

	useEffect(() => {
		if (props.logged) {
			axios
				.get(endpoint, { withCredentials: true })
				.then((list) => {
					const temp = [];
					list.data.forEach((element) => {
						temp.push(
							<VideoCard
								key={element.id}
								id={element.id}
								thumbnail={
									"http://localhost:3030/images/" +
									element.thumbnail
								}
								title={element.title}
							/>
						);
					});
					setList(temp);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [props.logged]);

	return props.logged === 1 ? (
		list.length ? (
			<div className={classes.container}>{list}</div>
		) : (
			<PleaseLogin
				message="No Video uploaded"
				link="/upload"
				btnMsg="upload"
			/>
		)
	) : (
		<PleaseLogin
			message="Please login to proceed"
			link="/login"
			btnMsg="login"
		/>
	);
}

export default VideoPallet;
