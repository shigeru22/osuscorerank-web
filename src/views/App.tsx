import React, { createContext, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import { getSettingsData, setSettingsData } from "../utils/Storage";
import { Settings, SettingsContext } from "../types/context/Settings";

const settingsContextValues: SettingsContext = {
	settings: getSettingsData(),
	setSettings: (data: Settings) => updateSettings(data)
};

const settingsContext = createContext<SettingsContext>(settingsContextValues);

function updateSettings(data: Settings) {
	/* TODO: handle settings data errors */
	setSettingsData(data);
}

function App() {
	const [ settings ] = useState<Settings>(settingsContextValues.settings);

	function setSettings(data: Settings) {
		updateSettings(data);
	}

	const location = useLocation();
	const routeSegments = location.pathname.split("/");

	const Provider = settingsContext.Provider;

	return (
		<Provider value={ {
			settings, setSettings
		} }>
			<div className="flex">
				<Sidebar active={ routeSegments[1] } />
				<div className="flex-grow h-screen overflow-y-auto">
					<Outlet />
				</div>
			</div>
		</Provider>
	);
}

export default App;
export { settingsContext };
