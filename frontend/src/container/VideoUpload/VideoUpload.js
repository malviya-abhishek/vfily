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
			!(this.state.title && this.state.thumbnail && this.state.description && this.state.file) ||
			this.state.uploading
		)
			return;

		this.setState({ uploading: true });

		const data = new FormData();

		data.append("title", this.state.title);
		data.append("description", this.state.description);
		data.append("video", this.state.video, this.state.video.name);
		data.append("thumbnail", this.state.thumbnail, this.state.thumbnail.name);

		axios
			.post(endpoint, data, {
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
												this.state.video.length
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
								{this.state.file
									? this.state.thumbnail.name.substr(
											0,
											Math.min(
												16,
												this.state.message.length
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
