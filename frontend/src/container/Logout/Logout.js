import React, { useEffect } from "react";
import { Redirect } from "react-router";
import axios from "../../axios/index";
import config from "../../config";
const API_URL = config.API_URL;


axios.defaults.withCredentials = true;



function Logout(props) {
	useEffect(() => {
		localStorage.setItem("logged", "0");
		localStorage.setItem("name", "");
		axios
			.get("/auth/logout", { withCredentials: true })
			.then((res) => {})
			.catch((e) => {
				console.log(e);
			});
		props.setLogged(0);
		props.setName(null);
	});

	return <Redirect to="/" />;
}

export default Logout;
