import React from "react";
import { Link } from "react-router-dom";
import classes from "./VideoCard.module.css";

function VideoCard(props) {
	return (
		<Link to={`/video/${props.id}`} style={{ textDecoration: "none" }}>
			<div
				className={classes.card}
				// class="card card-tall card-wide"
				style={{ backgroundImage: `url( ${ props.thumbnail } )` }}
			> {props.title} </div>
		</Link>
	);
}

export default VideoCard;
