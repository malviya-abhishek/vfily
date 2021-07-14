import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

import VideoPallet from "./container/VideoPallet/VideoPallet";
import VideoPlayer from "./container/VideoPlayer/VideoPlayer";
import VideoUpload from "./container/VideoUpload/VideoUpload";
import Signup from "./container/Signup/Signup";
import Login from "./container/Login/Login";
import Logout from "./container/Logout/Logout";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route exact path="/" component={VideoPallet} />
				<Route exact path="/video/:videoId" component={VideoPlayer} />
				<Route exact path="/upload" component={VideoUpload} />
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/logout" component={Logout} />
			</Switch>
		</div>
	);
}

export default App;

