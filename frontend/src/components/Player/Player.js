import React from "react";
import classes from "./Player.module.css";

function Player(props) {
	console.log("[Player]", props.url);

	return (
		<div className={classes.playerWrapper}>
			{props.url ? (
				<video className={classes.Player} controls>
					<source src={props.url} type="video/mp4" />
					<source src={props.url} type="video/ogg" />
				</video>
			) : null}

			<div className={classes.title}> {props.title} </div>
		</div>
	);
}

export default Player;
