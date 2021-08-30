import React, { useEffect, useState } from "react";
import classes from "./VideoCardProfile.module.css";
import ShareButton from "../ShareButton/ShareButton";
import { Link } from "react-router-dom";

function VideoCardProfile(props) {

	const [shared, setShared] = useState(false);

	function makePrivate(){
		setShared(!shared)
		if(!shared)
			props.CreateLinkHandler(props.id)
		else
			props.DeleteLinkHandler(props.id);
	}

	useEffect(()=>{
		setShared(props.shared)
	}, [props.shared] )

	return (
		<div className={classes.container}>

			<Link to={`/video/${props.id}`} >
			<img className={classes["video-img"]} src={props.thumbnail} />
			</Link>
			
			<div className={classes.details}>
				<div>
					{props.title.slice(0, Math.min(props.title.length, 10))}
				</div>
				<div className={classes["share-btn"]}>
					<ShareButton clickHandler={makePrivate} shared={shared} />
				</div>
			</div>

		</div>
	);
}

export default VideoCardProfile;
