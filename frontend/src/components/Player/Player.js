import React from "react";
import classes from "./Player.module.css";

function Player(props) {
	return (
		<div className={classes.playerWrapper}>
			{props.url ? (
				<video className={classes.Player} controls poster={props.thumbnail}>
					<source src={props.url} type="video/mp4" />
					<source src={props.url} type="video/ogg" />
				</video>
			) : null}

			<div className={classes.title}> {props.title} </div>
			<div className={classes.description} > {props.description} </div>
		</div>
	);
}

export default Player;
