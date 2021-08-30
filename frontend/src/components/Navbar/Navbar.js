import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import Item from "./Item";
import { MenuItems } from "./MenuItems";

function Navbar(props) {
	const ItemList = [];

	MenuItems.forEach((e) => {
		if ( e.logged === -1 || props.logged === e.logged)
			ItemList.push(<Item key={e.title} title={ ( e.title !== "name" ? e.title : props.name )} url={e.url} d={e.d} />);
	});

	return (
		<nav className={classes["navbar"]}>
			<ul className={classes["navbar-nav"]}>
				<li className={classes["logo"]}>
					<Link to="/" className={classes["nav-link"]}>
						<span
							className={
								(classes["logo-text"], classes["link-text"])
							}
						>
							Vfily
						</span>
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fad"
							data-icon="angle-double-right"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
							className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
						>
							<g className={classes["fa-group"]}>
								<path
									fill="currentColor"
									d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
									className={classes["fa-secondary"]}
								></path>
								<path
									fill="currentColor"
									d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
									className={classes["fa-primary"]}
								></path>
							</g>
						</svg>
					</Link>
				</li>

				{ItemList}

			</ul>
		</nav>
	);
}

export default Navbar;
