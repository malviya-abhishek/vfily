import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import classes from "./Signup.module.css";
import axios from "../../axios/index";
import config from "../../config";
const API_URL = config.API_URL;


class Signup extends Component {
	state = {
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		passwordRepeat: "",
		message: "Please enter details",
		defaultmessage: "Please enter details",
	};

	loginHandler = (data) => {
		axios
			.post("/auth", data)
			.then((result) => {
				this.props.setName(result.data.name);
				this.props.setLogged(1);
				localStorage.setItem("name", result.data.name);
				localStorage.setItem("logged", "1");
			})
			.catch((err) => {
				console.log("[User request]", err.response, err);
			});
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
		if (!this.state.firstName) {
			this.setState({ message: "Enter name" });
			return false;
		}
		if (!this.state.lastName) {
			this.setState({ message: "Enter last name" });
			return false;
		}
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
		if (!this.state.passwordRepeat) {
			this.setState({ message: "Enter password again" });
			return false;
		}
		if (this.state.password !== this.state.passwordRepeat) {
			this.setState({ message: "Passwor not matched" });
			return false;
		}
		return true;
	}

	handleUpload = (e) => {
		e.preventDefault();

		if (!this.validEntry()) return;

		const data = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			password: this.state.password,
		};

		axios
			.post('/users', data)
			.then((result) => {
				const loginData = {
					email: data.email,
					password: data.password,
				};
				this.loginHandler(loginData);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	render() {
		if (this.props.logged) {
			return <Redirect to="/" />;
		} else {
			return (
				<div style={{ marginTop: "50px" }}>
					<div className={classes.wrapper}>
						<h1 className={classes.title}>Sign Up</h1>
						<p className={classes["status"]}>
							{" "}
							{this.state.message}{" "}
						</p>

						<form className={classes.form}>
							{/* firstName */}
							<div>
								<input
									className={classes["input-title"]}
									type="text"
									name="firstName"
									value={this.state.firstName}
									onChange={this.changeHandler}
									placeholder="Name"
								/>
							</div>
							{/* firstName end */}

							{/* lastName */}
							<div>
								<input
									className={classes["input-title"]}
									type="text"
									name="lastName"
									value={this.state.lastName}
									onChange={this.changeHandler}
									placeholder="Last name"
								/>
							</div>
							{/* lastName end */}

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

							{/* passwordRepeat */}
							<div>
								<input
									className={classes["input-title"]}
									type="password"
									name="passwordRepeat"
									value={this.state.passwordRepeat}
									onChange={this.changeHandler}
									placeholder="Enter password again"
								/>
							</div>
							{/* passwordRepeat end */}

							<button
								type="submit"
								className={classes["sub-btn"]}
								onClick={this.handleUpload}
							>
								Signup
							</button>
						</form>
						<Link to="/login" className={classes["link"]}>
							Alreay have an account
						</Link>
					</div>
				</div>
			);
		}
	}
}

export default Signup;
