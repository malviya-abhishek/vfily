import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";

class Navbar extends Component {
	state = { clicked: false };
	handleClick = () => {
		this.setState({ clicked: ~this.state.clicked });
	};

	render() {
		return (
			<div className={this.state.clicked ? "openModal " : ""}>
				<nav className="NavbarItems proceeds-modal ">
					<Link to="/" style={{ textDecoration: "none" }}>
						<h1 className="navbar-logo">Vfily</h1>
					</Link>

					<div className="menu-icon" onClick={this.handleClick}>
						<i
							className={
								this.state.clicked
									? "fas fa-times"
									: "fas fa-bars"
							}
						></i>
					</div>

					<ul
						className={
							this.state.clicked ? "nav-menu active " : "nav-menu"
						}
					>
						{MenuItems.map((item, index) => {
							if (
								item.logged === -1 ||
								item.logged === this.props.logged
							) {
								return (
									<li key={index}>
										<Link
											className={item.cName}
											to={item.url}
											onClick={this.handleClick}
										>
											{item.title === "name"
												? this.props.name
												: item.title}
										</Link>
									</li>
								);
							} else return null;
						})}
					</ul>
				</nav>
			</div>
		);
	}
}
export default Navbar;
