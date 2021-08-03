import React from "react";
import classes from "./ShareButton.module.css";

function ShareButton(props) {
	return (
		<>
			{!props.shared ? (
				<button onClick={props.clickHandler} className={classes["btn-private"]}>PRIVATE</button>
			) : (
				<button onClick={props.clickHandler} className={classes["btn-shared"]}>SHARED</button>
			)}
		</>
	);
}

export default ShareButton;
