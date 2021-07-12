import { Route, Router, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

import VideoPallet from "./container/VideoPallet/VideoPallet";
import VideoPlayer from "./container/VideoPlayer/VideoPlayer";
import VideoUpload from "./container/VideoUpload/VideoUpload";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route exact path="/" component={VideoPallet} />
				<Route exact path="/video/:id" component={VideoPlayer} />
				<Route exact path="/upload" component={VideoUpload} />
			</Switch>
		</div>
	);
}

export default App;
