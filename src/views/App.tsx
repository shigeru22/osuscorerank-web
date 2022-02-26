import React, { createContext, useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import Navbar from "../components/shared/mobile/Navbar";
import { getSettingsData, setSettingsData } from "../utils/Storage";
import { Settings, SettingsContext } from "../types/context/Settings";
import { getAllCountries } from "../utils/api/Countries";
import { ICountryData } from "../types/data/Country";
import _ from "lodash";

const settingsContextValues: SettingsContext = {
	settings: getSettingsData(),
	countries: [],
	activeCountryId: getSettingsData().defaultCountryId,
	setSettings: (data: Settings) => updateSettings(data),
	setActiveCountryId: (id: number) => updateActiveCountryId(id)
};

const settingsContext = createContext<SettingsContext>(settingsContextValues);

function updateSettings(data: Settings) {
	/* TODO: handle settings data errors */
	setSettingsData(data);
}

function updateActiveCountryId(id: number) {
	settingsContextValues.activeCountryId = id;
}

function App() {
	const [ settings ] = useState<Settings>(settingsContextValues.settings);

	const [ activeCountryId, setActiveCountryId ] = useState(settingsContextValues.activeCountryId);
	const [ themeId, setDarkMode ] = useState(settings.themeId);

	const [ countries, setCountries ] = useState<ICountryData[]>(settingsContextValues.countries);

	useEffect(() => {
		async function getCountries() {
			const countries = await getAllCountries();

			if(!_.isUndefined(countries.data)) {
				setCountries(countries.data.countries.map(item => ({
					id: item.countryId,
					name: item.countryName,
					code: item.countryCode
				})));
			}
		}

		getCountries();
	}, []);

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

	function setActiveCountryStateId(id: number) {
		updateActiveCountryId(id);
		setActiveCountryId(id);
	}

	const location = useLocation();
	const routeSegments = location.pathname.split("/");

	const Provider = settingsContext.Provider;

	return (
		<Provider value={ {
			settings,
			countries,
			activeCountryId,
			setSettings,
			setActiveCountryId: setActiveCountryStateId
		} }>
			<div className="flex flex-col lg:flex-row">
				<div className="lg:hidden h-16">
					<Navbar active={ routeSegments[1] } countries={ countries } />
				</div>
				<div className="hidden lg:block">
					<Sidebar active={ routeSegments[1] } countries={ countries } />
				</div>
				<div className="flex-grow overflow-y-auto">
					<Outlet />
				</div>
			</div>
		</Provider>
	);
}

export default App;
export { settingsContext };
