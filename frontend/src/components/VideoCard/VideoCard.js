import React from "react";
import { Link } from "react-router-dom";
import classes from  "./VideoCard.module.css";


function VideoCard(props) {
	return (
		<Link to={`/video/${props.id}`} style={{textDecoration:"none"}} >
				<div className= {classes.card} >
					<img
						className= {classes.thumbnail} 
						src={props.thumbnail}
						alt="Video"
					></img>
					<h3 className={ classes.title}>{props.title}</h3>
				</div>
			</Link>
	);
}

export default VideoCard;
