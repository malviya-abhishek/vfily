import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import classes from "./Login.module.css";



const endpoint = "http://localhost:3030/auth";

class Login extends Component {
	state = {
		email: "",
		password: "",
		message: "Please enter details",
		defaultmessage: "Please enter details",
	};

	changeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			...this.state,
			[name]: value,
		});
	};

	validEntry() {
		if (!this.state.email) {
			this.setState({ message: "Enter email" });
			return false;
		}
		if (!this.state.email) {
			this.setState({ message: "Enter email" });
			return false;
		} else {
			const regx =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (regx.test(String(this.state.email).toLowerCase()) === false) {
				this.setState({ message: "Enter correct mail" });
				return false;
			}
		}
		if (!this.state.password) {
			this.setState({ message: "Enter password" });
			return false;
		}
		return true;
	}

	handleUpload = (e) => {
		e.preventDefault();

		if (!this.validEntry()) return;

		const data = {
		  email:this.state.email,
		  password:this.state.password
		}

		axios
			.post(endpoint, data)
			.then((result) => {
				localStorage.setItem('token', result.data.accessToken);
				localStorage.setItem('refreshToken', result.data.refreshToken);
				this.props.setLogged(1);
			})
			.catch((err) => {
				console.log( "[User request]" ,err.response, err);
			});
	};

	render() {

		console.log("[ logged value ]", this.props.logged);

		if(this.state.logged === 1)
			return <Redirect to="/" />

		if(this.props.logged){
			return <Redirect to="/" />
		}
		else{
		return (
			<div style={{ marginTop: "50px" }}>
				<div className={classes.wrapper}>
					<h1 className={classes.title}>Login</h1>
					<p className={classes["status"]}> {this.state.message} </p>

					<form className={classes.form}>

						{/* email */}
						<div>
							<input
								className={classes["input-title"]}
								type="email"
								name="email"
								value={this.state.email}
								onChange={this.changeHandler}
								placeholder="Email"
							/>
						</div>
						{/* email end */}

						{/* password */}
						<div>
							<input
								className={classes["input-title"]}
								type="password"
								name="password"
								value={this.state.password}
								onChange={this.changeHandler}
								placeholder="Password"
							/>
						</div>
						{/* password end */}


						<button
							type="submit"
							className={classes["sub-btn"]}
							onClick={this.handleUpload}
						>
							Login
						</button>
					</form>
					<Link to="/signup" className={classes["link"]}>
						Create Account
					</Link>
				</div>
			</div>
		);}
	}
}

export default Login;
