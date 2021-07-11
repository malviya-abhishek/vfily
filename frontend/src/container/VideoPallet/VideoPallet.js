import React, { Component } from "react";
import VideoCard from "../../components/VideoCard/VideoCard";
import classes from "./VideoPallet.module.css";

class VideoPallet extends Component {

  state = {
    list:[]
  }

  componentDidMount(){
    const temp = [];
    for(let i = 0 ; i < 10 ; ++i)
      temp.push(<VideoCard
        key = {i}
        id={i}
        thumbnail="./images/default.png"
        title="title"
      /> )
    this.setState({list:temp})
  }


	render() {
		return (
			<div className={classes.container}>
				{this.state.list}
			</div>
		);
	}
}
export default VideoPallet;
