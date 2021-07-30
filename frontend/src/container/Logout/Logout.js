import React, { useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";
axios.defaults.withCredentials = true;

const endpoint = "http://localhost:3030/auth/logout";

function Logout(props) {
	useEffect(() => {
		axios
			.get(endpoint, { withCredentials: true })
			.then((res) => {
				props.setLogged(0);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	return <Redirect to="/" />;
}

export default Logout;
