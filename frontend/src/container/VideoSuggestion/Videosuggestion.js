import React, { Component } from 'react';
import VideoCard from '../../components/VideoCard/VideoCard'

class Videosuggestion extends Component {
  render() {
    return (
      <div>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
      </div>
    );
  }
}

export default Videosuggestion;