import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

import VideoPallet from "./container/VideoPallet/VideoPallet";
import VideoPlayer from "./container/VideoPlayer/VideoPlayer";
import VideoUpload from "./container/VideoUpload/VideoUpload";
import Signup from "./container/Signup/Signup";
import Login from "./container/Login/Login";
import Logout from "./container/Logout/Logout";
import { useState, useEffect } from "react";

function App() {
	const [logged, setLogged] = useState(0);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setLogged(1);
		}
	}, []);

	return (
		<div className="App">
			<Navbar logged={logged} />
			<Switch>
				<Route
					exact
					path="/"
					render={(props) => (
						<VideoPallet {...props} logged={logged} />
					)}
				/>

				<Route
					exact
					path="/video/shared/:videoId"
					render={(props) => <VideoPlayer {...props} shared={true} />}
				/>

				<Route exact path="/video/:videoId" component={VideoPlayer} />

				<Route
					exact
					path="/upload"
					render={(props) => <VideoUpload {...props} />}
				/>
				<Route
					exact
					path="/signup"
					render={(props) => (
						<Signup
							{...props}
							logged={logged}
							setLogged={setLogged}
						/>
					)}
				/>
				<Route
					exact
					path="/login"
					render={(props) => (
						<Login
							{...props}
							logged={logged}
							setLogged={setLogged}
						/>
					)}
				/>
				<Route
					exact
					path="/logout"
					render={(props) => (
						<Logout
							{...props}
							logged={logged}
							setLogged={setLogged}
						/>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
