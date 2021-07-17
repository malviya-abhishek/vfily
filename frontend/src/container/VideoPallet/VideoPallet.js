import React, { Component } from "react";
import VideoCard from "../../components/VideoCard/VideoCard";
import classes from "./VideoPallet.module.css";
import axios from "axios";
import PleaseLogin from "../../components/Pleaselogin/PleaseLogin";

class VideoPallet extends Component {
	state = {
		list: [],
	};

	componentDidMount() {
		// if (this.props.logged === 1) {
			axios
				.get("http://localhost:3030/videos")
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
		// }
	}

	render() {
		return( 
			this.props.logged === 1 ?  <div className={classes.container}>{this.state.list}</div> : <PleaseLogin /> 
		);

		}
}
export default VideoPallet;
