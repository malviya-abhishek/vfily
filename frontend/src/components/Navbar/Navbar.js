import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";

class Navbar extends Component {
	state = { clicked: false, logged: 0 };
	handleClick = () => {
		this.setState({ clicked: ~this.state.clicked });
	};

	componentDidMount() {
		const token = localStorage.getItem("token");
		if (token) this.setState({ logged: 1 });
		else this.setState({ logged: 0 });
	}

	componentDidUpdate() {
		const token = localStorage.getItem("token");
		// if (token && this.state.logged != 1 ) this.setState({ logged: 1 });
		// else if(this.state.logged != 0) this.setState({ logged: 0 });
	}

	render() {
		return (
			<nav className="NavbarItems">
				<Link to="/" style={{ textDecoration: "none" }}>
					<h1 className="navbar-logo">Vfily</h1>
				</Link>
				<div className="menu-icon" onClick={this.handleClick}>
					<i
						className={
							this.state.clicked ? "fas fa-times" : "fas fa-bars"
						}
					></i>
				</div>
				<ul
					className={
						this.state.clicked ? "nav-menu active" : "nav-menu"
					}
				>
					{MenuItems.map((item, index) => {
						if (
							item.logged === -1 ||
							item.logged === this.state.logged
						) {
							return (
								<li key={index}>
									<Link
										className={item.cName}
										to={item.url}
										onClick={this.handleClick}
									>
										{item.title}
									</Link>
								</li>
							);
						} else return <></>;
					})}
				</ul>
			</nav>
		);
	}
}
export default Navbar;
