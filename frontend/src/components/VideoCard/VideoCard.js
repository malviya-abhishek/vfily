import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./VideoCard.module.css";

function VideoCard(props) {
	const [thumbnail, setThumbnail] = useState(null);

	useEffect(() => {
		const config = {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
			responseType: "arraybuffer",
		};

		axios
			.get(props.thumbnail, config)
			.then((result) => {
				const base64 = btoa(
					new Uint8Array(result.data).reduce(
						(data, byte) => data + String.fromCharCode(byte),
						""
					)
				);
				setThumbnail("data:;base64," + base64);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [props.thumbnail]);

	return (
		<Link to={`/video/${props.id}`} style={{ textDecoration: "none" }}>
			<div className={classes.card}>
				<img
					className={classes.thumbnail}
					src={ thumbnail ? thumbnail : "images/default.png" }
					alt="Video"
				></img>
				<h3 className={classes.title}>{props.title}</h3>
			</div>
		</Link>
	);
}

export default VideoCard;
