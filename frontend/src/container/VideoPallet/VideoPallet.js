import React, { Component } from "react";
import VideoCard from "../../components/VideoCard/VideoCard";
import './VideoPallet.css'

class VideoPallet extends Component {

  

	render() {
		return (
      <div className="container" >
      <VideoCard id="1"/>
        <VideoCard id="1"/>
        <VideoCard id="2"/>
        <VideoCard id="3"/>
        <VideoCard id="4"/>
        <VideoCard id="1"/>      
      </div>
		);
	}
}
export default VideoPallet;
