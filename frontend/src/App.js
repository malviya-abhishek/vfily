import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

import VideoPallet from "./container/VideoPallet/VideoPallet";
import VideoPlayer from "./container/VideoPlayer/VideoPlayer";
import VideoUpload from "./container/VideoUpload/VideoUpload";
import Signup from "./container/Signup/Signup";
import Login from "./container/Login/Login";
import Logout from "./container/Logout/Logout";
import Profile from "./container/Profile/Profile";
import { useState, useEffect } from "react";





function App() {
	const [logged, setLogged] = useState(0);
	const [name, setName] = useState(null);

	useEffect(() => {
		const loggedLocal = localStorage.getItem("logged");
		const nameLocal = localStorage.getItem("name");
		if (loggedLocal === "1") {
			setLogged(1);
			setName(nameLocal);
		}
	}, []);

	useEffect(() => {
		setInterval(() => {
			console.log("log out");
			localStorage.removeItem("logged");
			localStorage.removeItem("name");
		}, 1000 * 60 * 60 * 5);
	});

	return (
		<div className="App">
			<Navbar logged={logged} name={name} />
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
					path="/profile"
					render={(props) => <Profile {...props} logged={logged} />}
				/>

				<Route
					exact
					path="/video/shared/:videoId"
					render={(props) => (
						<VideoPlayer {...props} shared={true} logged={logged} />
					)}
				/>

				<Route
					exact
					path="/video/:videoId"
					render={(props) => (
						<VideoPlayer {...props} logged={logged} />
					)}
				/>

				{/* <Route exact path="/video/:videoId" component={VideoPlayer} /> */}

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
							setName={setName}
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
							setName={setName}
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
							setName={setName}
						/>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
