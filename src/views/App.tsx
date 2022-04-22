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
import _, { isUndefined } from "lodash";
import { IUpdateData } from "../types/Update";
import { getLatestUpdate } from "../utils/api/Updates";

const settingsContextValues: SettingsContext = {
	settings: getSettingsData(),
	logs: [],
	showErrorDialog: false,
	countries: [],
	updateData: null,
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

function validateSettings(settings: Settings) {
	const tempSettings = { ...settings };
	let updated = 0;

	if(_.isUndefined(settings.themeId)) {
		tempSettings.themeId = 1;
		updated++;
	}

	if(_.isUndefined(settings.dateFormatId)) {
		tempSettings.dateFormatId = 1;
		updated++;
	}

	if(_.isUndefined(settings.defaultCountryId)) {
		tempSettings.defaultCountryId = 1;
		updated++;
	}

	if(_.isUndefined(settings.defaultSortingId)) {
		tempSettings.defaultSortingId = 1;
		updated++;
	}

	if(_.isUndefined(settings.starredUserId)) {
		tempSettings.starredUserId = [];
		updated++;
	}

	if(updated > 0) {
		addLogData(LogType.INFO, "Settings updated. Reflecting new changes...");
		updateSettings(tempSettings);
		return tempSettings as Settings;
	}
	else return undefined;
}

addLogData(LogType.INFO, "Application started.");

function App() {
	const [ settings ] = useState<Settings>(settingsContextValues.settings);

	{
		const temp = validateSettings(settings);

		if(!_.isUndefined(temp)) {
			settings.themeId = temp.themeId;
			settings.dateFormatId = temp.dateFormatId;
			settings.defaultCountryId = temp.defaultCountryId;
			settings.defaultSortingId = temp.defaultSortingId;
			settings.starredUserId = temp.starredUserId;
		}
	}

	const [ logs ] = useState(settingsContextValues.logs);
	const [ activeCountryId, setActiveCountryId ] = useState(settingsContextValues.activeCountryId);
	const [ themeId, setDarkMode ] = useState(settings.themeId);
	const [ countries, setCountries ] = useState<ICountryData[]>(settingsContextValues.countries);
	const [ updateData, setUpdateData ] = useState<IUpdateData | null>(null);

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
		async function getCountriesAndUpdateData() {
			addLogData(LogType.INFO, "Fetching country data...");
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

			addLogData(LogType.INFO, "Fetching latest update data...");
			const update = await getLatestUpdate();

			if(isUndefined(update.data)) {
				addLogData(LogType.ERROR, `Fetch update data failed: ${ update.message }`);
				return;
			}

			setUpdateData(update.data.updateData);

			addLogData(LogType.INFO, "Fetch update data success.");
		}

		getCountriesAndUpdateData();
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

	useEffect(() => {
		if(showErrorDialog) {
			document.body.classList.add("overflow-y-hidden");
		}
		else {
			document.body.classList.remove("overflow-y-hidden");
			document.body.classList.length <= 0 && document.body.removeAttribute("class");
		}
	}, [ showErrorDialog ]);

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
			updateData,
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
