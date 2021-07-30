import React, { Component } from "react";
import VideoCard from "../../components/VideoCard/VideoCard";
import classes from "./VideoPallet.module.css";
import PleaseLogin from "../../components/Pleaselogin/PleaseLogin";
import axios from "axios";

axios.defaults.withCredentials = true;

const endpoint = "http://localhost:3030/videos";

class VideoPallet extends Component {
	state = {
		list: [],
	};

	componentDidMount() {
		if (this.props.logged) {
			axios
				.get(endpoint, { withCredentials: true })
				.then((list) => {
					const temp = [];
					list.data.forEach((element) => {
						temp.push(
							<VideoCard
								key={element.id}
								id={element.id}
								thumbnail={
									"http://localhost:3030/images/" +
									element.thumbnail
								}
								title={element.title}
							/>
						);
					});
					this.setState({ list: temp });
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	render() {
		return this.props.logged === 1 ? (
			this.state.list.length ? (
				<div className={classes.container}>{this.state.list}</div>
			) : (
				<PleaseLogin
					message="No Video uploaded"
					link="/upload"
					btnMsg="upload"
				/>
			)
		) : (
			<PleaseLogin
				message="Please login to proceed"
				link="/login"
				btnMsg="login"
			/>
		);
	}
}
export default VideoPallet;
