import React, { createContext, useEffect, useState } from "react";
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
	const [ themeId, setDarkMode ] = useState(settings.themeId);

	useEffect(() => {
		if(themeId === 3 || (themeId === 1 && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
			document.documentElement.classList.add("dark");
		}
		else {
			const body = document.documentElement;

			body.classList.remove("dark");
			body.classList.length <= 0 && body.removeAttribute("class");
		}
	}, [ themeId ]);

	function setSettings(data: Settings) {
		updateSettings(data);

		/* TODO: find better solution */
		settings.themeId = data.themeId;
		settings.dateFormatId = data.dateFormatId;
		settings.defaultCountryId = data.defaultCountryId;
		settings.defaultSortingId = data.defaultSortingId;
		settings.starredUserId = data.starredUserId;

		setDarkMode(data.themeId);
	}

	const location = useLocation();
	const routeSegments = location.pathname.split("/");

	const Provider = settingsContext.Provider;

	return (
		<Provider value={ {
			settings, setSettings
		} }>
			<div className="flex dark:bg-dark-20">
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
