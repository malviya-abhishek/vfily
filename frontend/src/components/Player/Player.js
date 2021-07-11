import React from "react";
import ReactPlayer from "react-player";
import classes from "./Player.module.css";

function Player(props) {
	return (
		<div className={classes.playerWrapper}>
			<video  className={classes.Player} controls >
				<source src={props.url} type="video/mp4" />
				{/* <source src={props.url} type="video/ogg" /> */}
			</video>


			<div className={classes.title}> {props.title + ' ' + props.id } </div>
		</div>
	);
}

export default Player;
 