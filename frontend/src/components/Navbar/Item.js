import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

function Item(props) {
	return (
		<li className={classes["nav-item"]}>
			<Link to={props.url} className={classes["nav-link"]}>
				<svg
					aria-hidden="true"
					focusable="false"
					data-prefix="fad"
					data-icon="cat"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					className="svg-inline--fa fa-cat fa-w-16 fa-9x"
				>
					<g className={classes["fa-group"]}>
						<path
							fill="currentColor"
							d={props.d}
							// d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
							className={classes["fa-secondary"]}
						/>

						<path
							fill="currentColor"
							d={props.d}
							// d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
							className={classes["fa-primary"]}
						/>
					</g>
				</svg>
				<span className={classes["link-text"]}>{props.title}</span>
			</Link>
		</li>
	);
}

export default Item;
