import React, { Component } from "react";
import classes from "./VideoUpload.module.css";
import axios from "axios";

const endpoint = "http://localhost:3030/upload";

class VideoUpload extends Component {
	state = {
		video: {
			title: "",
			description: "",
			file: null,
			loaded: 0,
			message: "Choose a file...",
			defaultmessage: "Choose a file...",
			uploading: false,
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

	handleUpload = (event) => {

		console.log("hello");

		event.preventDefault();
		// if (!(this.state.title && this.state.description && this.state.file))
		// 	return;

		const data = new FormData();

		data.append("title", this.state.title);
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);

		// data.append("file", this.state.selectedFile);

		data.append("description", this.state.description);

		axios
			.post(endpoint, data, {
				onUploadProgress: (ProgressEvent) => {
					this.setState({
						loaded: Math.round(
							(ProgressEvent.loaded / ProgressEvent.total) * 100
						),
					});
				},
			})
			.then((res) => {
				this.setState({
					selectedFile: null,
					message: "Uploaded successfully",
					uploading: false,
				});
			})
			.catch((err) => {
				this.setState({
					uploading: false,
					message: "Failed to upload",
				});
			});
	};

	changeFileHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
      message: event.target.files[0]
        ? event.target.files[0].name
        : this.state.defaultmessage
    });
  };

	render() {
		return (
			<div>
				<p>Upload new video</p>
				<h1> Hello {this.state.defaultmessage} </h1>
				<form>
					<lable>Title</lable>
					<input
						type="text"
						name="title"
						value={this.state.video.title}
						onChange={this.changeHandler}
					/>
					<lable>Description</lable>
					<textarea
						type="textarea"
						name="description"
						value={this.state.video.description}
						onChange={this.changeHandler}
					/>
					<lable>Video</lable>
					<input
						type="file"
						name="file"
						onChange={this.changeFileHandler}
					/>
				</form>
				<button className="submit" onClick={this.handleUpload}>
					Upload
				</button>
			</div>
		);
	}
}

export default VideoUpload;
