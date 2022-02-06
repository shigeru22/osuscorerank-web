import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";

function App() {
	const location = useLocation();
	const routeSegments = location.pathname.split("/");

	return (
		<div className="flex">
			<Sidebar active={ routeSegments[1] } />
			<div className="flex-grow h-screen overflow-y-auto">
				<Outlet />
			</div>
		</div>
	);
}

export default App;
