import React from "react";
import { Link } from "react-router-dom";
import classes from "./PleaseLogin.module.css";
import Button from "../Button/Button";

function PleaseLogin(props) {
	return (
		<div className={classes.wrapper}>
			<img
				alt="loginImage"
				src="/images/login.jpg"
				className={classes["login-image"]}
			/>
			<p className={classes["sub-text"]}> {props.message} </p>
			<Link to={props.link} className={classes["login-link"]}>
				<Button> {props.btnMsg} </Button>
			</Link>
		</div>
	);
}

export default PleaseLogin;
