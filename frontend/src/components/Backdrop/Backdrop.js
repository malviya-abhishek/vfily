import React from "react";
import classes from './Backdrop.module.css'

function Backdrop(props) {
	return (
		<div className={classes["openModal"]}>
			<div className={classes["proceeds-modal"]} >modal</div>
		</div>
	);
}

export default Backdrop;
