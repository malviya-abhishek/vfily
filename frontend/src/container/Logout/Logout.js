import React, { useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";

// import {socket} from '../../context/socket'

axios.defaults.withCredentials = true;

const endpoint = "http://localhost:3030/auth/logout";

function Logout(props) {
	useEffect(() => {
		localStorage.setItem("logged", "0");
		localStorage.setItem("name", "");
		axios
			.get(endpoint, { withCredentials: true })
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
