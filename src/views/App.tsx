import React, { createContext, useEffect, useRef, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import Navbar from "../components/shared/mobile/Navbar";
import DimBackground from "../components/shared/DimBackground";
import ErrorDialog from "../components/shared/ErrorDialog";
import { getSettingsData, setSettingsData } from "../utils/Storage";
import { Settings, SettingsContext } from "../types/context/Settings";
import { getAllCountries } from "../utils/api/Countries";
import { LogType } from "../utils/Logging";
import { ICountryData } from "../types/data/Country";
import _ from "lodash";

const settingsContextValues: SettingsContext = {
	settings: getSettingsData(),
	logs: [],
	showErrorDialog: false,
	countries: [],
	activeCountryId: getSettingsData().defaultCountryId,
	setSettings: (data: Settings) => updateSettings(data),
	setShowErrorDialog: (value: boolean) => setShowErrorDialog(value),
	setActiveCountryId: (id: number) => updateActiveCountryId(id),
	addLogData: (name: LogType, description: string) => addLogData(name, description)
};

const settingsContext = createContext<SettingsContext>(settingsContextValues);

function updateSettings(data: Settings) {
	/* TODO: handle settings data errors */
	setSettingsData(data);
}

function setShowErrorDialog(value: boolean) {
	settingsContextValues.showErrorDialog = value;
}

function updateActiveCountryId(id: number) {
	settingsContextValues.activeCountryId = id;
}

function addLogData(name: LogType, description: string) {
	settingsContextValues.logs.push({
		id: settingsContextValues.logs.length + 1,
		time: new Date(),
		name,
		description
	});
}

addLogData(LogType.INFO, "Application started.");

function App() {
	const [ settings ] = useState<Settings>(settingsContextValues.settings);

	const [ logs ] = useState(settingsContextValues.logs);
	const [ activeCountryId, setActiveCountryId ] = useState(settingsContextValues.activeCountryId);
	const [ themeId, setDarkMode ] = useState(settings.themeId);
	const [ countries, setCountries ] = useState<ICountryData[]>(settingsContextValues.countries);

	const [ showErrorDialog, setShowErrorDialog ] = useState(settingsContextValues.showErrorDialog);

	const refErrorDialog = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if(refErrorDialog.current && !refErrorDialog.current.contains(event.target as Element)) {
				setShowErrorDialog(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		async function getCountries() {
			const countries = await getAllCountries();

			if(_.isUndefined(countries.data)) {
				addLogData(LogType.ERROR, `Fetch country failed: ${ countries.message }`);
				return;
			}

			setCountries(countries.data.countries.map(item => ({
				id: item.countryId,
				name: item.countryName,
				code: item.countryCode
			})));

			addLogData(LogType.INFO, "Fetch country success.");
		}

		addLogData(LogType.INFO, "Fetching country data...");
		getCountries();
	}, []);

	useEffect(() => {
		if(themeId === 3 || (themeId === 1 && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
			document.documentElement.classList.add("dark");
			addLogData(LogType.INFO, "Dark mode enabled.");
		}
		else {
			const body = document.documentElement;

			body.classList.remove("dark");
			body.classList.length <= 0 && body.removeAttribute("class");

			addLogData(LogType.INFO, "Dark mode disabled.");
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

		addLogData(LogType.INFO, "Settings updated.");
	}

	function setActiveCountryStateId(id: number) {
		updateActiveCountryId(id);
		setActiveCountryId(id);

		addLogData(LogType.INFO, `Set active country ID to ${ id }.`);
	}

	const location = useLocation();
	const routeSegments = location.pathname.split("/");

	const Provider = settingsContext.Provider;

	useEffect(() => {
		addLogData(LogType.INFO, `Route opened: ${ location.pathname }`);
	}, [ location.pathname ]);

	return (
		<Provider value={ {
			settings,
			logs,
			showErrorDialog,
			countries,
			activeCountryId,
			setSettings,
			setActiveCountryId: setActiveCountryStateId,
			addLogData,
			setShowErrorDialog
		} }>
			<div className="flex flex-col lg:flex-row">
				<div className="lg:hidden h-16">
					<Navbar active={ routeSegments[1] } countries={ countries } />
				</div>
				<div className="hidden fixed lg:block">
					<Sidebar active={ routeSegments[1] } countries={ countries } />
				</div>
				<div className="flex-grow overflow-y-auto lg:pl-32">
					<Outlet />
				</div>
				{
					showErrorDialog &&
					<DimBackground>
						<ErrorDialog htmlRef={ refErrorDialog } data={ logs } onCancelClick={ () => setShowErrorDialog(false) } />
					</DimBackground>
				}
			</div>
		</Provider>
	);
}

export default App;
export { settingsContext };
