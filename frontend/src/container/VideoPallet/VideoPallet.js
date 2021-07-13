import React, { Component } from "react";
import VideoCard from "../../components/VideoCard/VideoCard";
import classes from "./VideoPallet.module.css";
import axios from "axios";

class VideoPallet extends Component {
	state = {
		list: [],
	};

	componentDidMount() {
		axios
			.get("http://localhost:3030/videos")
			.then((list) => {
				console.log(list);
				const temp = [];
				list.data.forEach((element) => {
					temp.push(
						<VideoCard
							key={element.id}
							id={element.id}
							thumbnail={ "http://localhost:3030/images/" +  element.thumbnail}
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

	render() {
		return <div className={classes.container}>{this.state.list}</div>;
	}
}
export default VideoPallet;
