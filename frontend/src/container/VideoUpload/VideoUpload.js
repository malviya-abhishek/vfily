import React, { Component } from "react";
import classes from "./VideoUpload.module.css";
import axios from "axios";

const endpoint = "http://localhost:3030/upload";

class VideoUpload extends Component {
	state = {
		title: "",
		description: "",

		video: null,
		thumbnail: null,

		loaded: 0,

		message: "Enter detail",
		defaultmessage: "Enter detail",

		uploading: false,
	};

	changeHandler = (e) => {
		if (this.state.uploading) return;

		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			...this.state,
			[name]: value,
			message:
				this.state.video &&
				this.state.thumbnail &&
				this.state.title &&
				this.state.description
					? "Ready to Upload"
					: this.state.defaultmessage,
		});
	};

	handleUpload = (event) => {
		event.preventDefault();

		if (
			!(
				this.state.title &&
				this.state.thumbnail &&
				this.state.description &&
				this.state.video
			) ||
			this.state.uploading
		)
			return;

		this.setState({ uploading: true });

		const data = new FormData();

		data.append("title", this.state.title);
		data.append("description", this.state.description);
		data.append(
			"thumbnail",
			this.state.thumbnail,
			this.state.thumbnail.name
		);

		data.append("video", this.state.video, this.state.video.name);

		const config = {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		};

		axios
			.post(endpoint, data, config, {
				onUploadProgress: (ProgressEvent) => {
					this.setState({
						message:
							Math.round(
								(ProgressEvent.loaded / ProgressEvent.total) *
									100
							) + " % completed",
					});
				},
			})
			.then((res) => {
				this.setState({
					file: null,
					title: "",
					description: "",
					message: "Uploaded successfully",
					uploading: false,
				});
			})
			.catch((err) => {
				console.log(err.response);
				this.setState({
					uploading: false,
					message: "Failed to upload",
				});
			});
	};

	changeVideoHandler = (event) => {
		if (this.state.uploading) return;

		this.setState({
			video: event.target.files[0],
			loaded: 0,
			message:
				event.target.files[0] &&
				this.state.thumbnail &&
				this.state.title &&
				this.state.description
					? "Ready to Upload"
					: this.state.defaultmessage,
		});
	};

	changeThumbnailHandler = (event) => {
		if (this.state.uploading) return;

		this.setState({
			thumbnail: event.target.files[0],
			message:
				event.target.files[0] &&
				this.state.video &&
				this.state.title &&
				this.state.description
					? "Ready to Upload"
					: this.state.defaultmessage,
		});
	};

	render() {
		return (
			<div style={{ marginTop: "50px" }}>
				<div className={classes.wrapper}>
					<h1 className={classes.title}>Upload new video</h1>
					<p className={classes.status}>
						Status:-{" "}
						{this.state.message.substr(
							0,
							Math.min(16, this.state.message.length)
						)}
					</p>
					<form className={classes.form}>
						{/* Title */}
						<div>
							<input
								className={classes["input-title"]}
								type="text"
								name="title"
								value={this.state.title}
								onChange={this.changeHandler}
								placeholder=" Enter title"
							/>
						</div>
						{/* Title end */}

						{/* Description */}
						<div>
							<textarea
								className={classes["input-description"]}
								type="textarea"
								name="description"
								value={this.state.description}
								onChange={this.changeHandler}
								placeholder="Enter Description"
							/>
						</div>
						{/* Description end */}

						{/* Video */}
						<div>
							<label className={classes["lable-file"]}>
								<input
									type="file"
									onChange={this.changeVideoHandler}
								/>
								{this.state.video
									? this.state.video.name.substr(
											0,
											Math.min(
												16,
												this.state.video.name.length
											)
									  )
									: "Select a Video"}
							</label>
						</div>
						{/* Video end */}

						{/* Thumbnail  */}
						<div>
							<label className={classes["lable-file"]}>
								<input
									type="file"
									onChange={this.changeThumbnailHandler}
								/>
								{this.state.thumbnail
									? this.state.thumbnail.name.substr(
											0,
											Math.min(
												16,
												this.state.thumbnail.name.length
											)
									  )
									: "Select a Thumbnail"}
							</label>
						</div>
						{/* Thumbnail end  */}

						<button
							type="submit"
							className={classes["sub-btn"]}
							onClick={this.handleUpload}
						>
							Upload
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default VideoUpload;
