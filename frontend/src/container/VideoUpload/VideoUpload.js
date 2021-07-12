import React, { Component } from "react";
import classes from "./VideoUpload.module.css";

class VideoUpload extends Component {
	state = {
		video: {
			title: "",
      file:null
		},
	};

	changeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			video: {
				...this.state.video,
				[name]: value,
			},
		});
    console.log(name, value);
	};

	render() {
		return (
			<div>
				<p>Upload new video</p>
				<form>
					<lable>Title</lable>
					<input
						type="text"
						name="title"
						value={this.state.video.title}
						onChange={this.changeHandler}
					/>
          <lable>Video</lable>
					<input
						type="file"
						name="file"
						// value={this.state.video.title}
						// onChange={this.changeHandler}
					/>
				</form>
			</div>
		);
	}
}

export default VideoUpload;
