import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";

function App() {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-grow h-screen overflow-y-auto">
				<Outlet />
			</div>
		</div>
	);
}

export default App;
