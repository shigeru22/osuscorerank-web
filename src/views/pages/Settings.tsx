import React, { useState, useRef, useEffect, useContext } from "react";
import isNull from "lodash/isNull";
import isEqual from "lodash/isEqual";
import Dropdown from "../../components/shared/inputs/Dropdown";
import Button from "../../components/shared/inputs/Button";
import DimBackground from "../../components/shared/DimBackground";
import Dialog from "../../components/shared/mobile/Dialog";
import { settingsContext } from "../App";
import { Settings as SettingsData } from "../../types/context/Settings";
import { getGreetingData } from "../../utils/api/Main";
import { themeOptions, dateFormatOptions, sortOptions } from "../../utils/Options";
import { LogType } from "../../utils/Logging";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const enum VersionType {
	WEB_VERSION = 1,
	API_VERSION
}

function Settings() {
	const { settings, countries, updateData, setSettings, addLogData, setShowErrorDialog } = useContext(settingsContext);

	const [ themeId, setThemeId ] = useState(settings.themeId);
	const [ dateFormatId, setDateFormatId ] = useState(settings.dateFormatId);
	const [ defaultCountryId, setDefaultCountryId ] = useState(settings.defaultCountryId);
	const [ defaultSortingId, setDefaultSortingId ] = useState(settings.defaultSortingId);

	const [ starredUsers, setStarredUsers ] = useState(settings.starredUserId);
	const [ showResetUsersDialog, setShowResetUsersDialog ] = useState(false);

	const [ apiOnlineStatus, setApiOnlineStatus ] = useState(-1);

	const refResetStarredDialog = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if(refResetStarredDialog.current && !refResetStarredDialog.current.contains(event.target as Element)) {
				setShowResetUsersDialog(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		handleApiTest();

	/* disable since only be run once */
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		addLogData(LogType.INFO, "Settings state changed. Updating local settings...");

		const newSettings: SettingsData = {
			themeId,
			dateFormatId,
			defaultCountryId,
			defaultSortingId,
			starredUserId: settings.starredUserId
		};

		setSettings(newSettings);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ themeId, dateFormatId, defaultCountryId, defaultSortingId, settings.starredUserId, setSettings ]);

	useEffect(() => {
		if(showResetUsersDialog) {
			document.body.classList.add("overflow-y-hidden");
		}
		else {
			document.body.classList.remove("overflow-y-hidden");
			document.body.classList.length <= 0 && document.body.removeAttribute("class");
		}
	}, [ showResetUsersDialog ]);

	function handleResetStarredUsers() {
		if(settings.starredUserId.length <= 0) {
			setShowResetUsersDialog(false);
			return;
		}

		const newSettings: SettingsData = {
			themeId: settings.themeId,
			dateFormatId: settings.dateFormatId,
			defaultCountryId: settings.defaultCountryId,
			defaultSortingId: settings.defaultSortingId,
			starredUserId: settings.starredUserId
		};

		newSettings.starredUserId = [];

		setSettings(newSettings);
		setStarredUsers([ ...newSettings.starredUserId ]);

		addLogData(LogType.INFO, "Settings updated.");

		setShowResetUsersDialog(false);
	}

	async function handleApiTest() {
		addLogData(LogType.INFO, "Checking API status...");
		setApiOnlineStatus(-1);

		const response = await getGreetingData();

		if(isEqual(response.message, "Hello, world!")) {
			addLogData(LogType.INFO, "API status normal.");
			setApiOnlineStatus(1);
		}
		else {
			addLogData(LogType.ERROR, `Unable to connect to API: ${ response.message }`);
			setApiOnlineStatus(0);
		}
	}

	function getApiStatusString() {
		let str = "Unknown status";

		switch(apiOnlineStatus) {
			case -1: str = "Checking..."; break;
			case 0: str = "Error"; break;
			case 1: str = "Working normally"; break;
		}

		return str;
	}

	function getUpdateVersionString(type: VersionType) {
		let str = "";

		if(!isNull(updateData)) {
			switch(type) {
				case VersionType.API_VERSION: str = updateData.apiVersion; break;
				case VersionType.WEB_VERSION: str = updateData.webVersion; break;
			}
		}

		return str;
	}

	return (
		<>
			<div className="px-8 py-0 md:px-14 md:py-8 lg:py-12 md:space-y-6">
				<h1 className="hidden md:inline font-semibold text-3xl text-light-100 dark:text-dark-100">Settings</h1>
				<div className="flex flex-col xl:flex-row gap-x-12 gap-y-4 pb-6">
					<div className="xl:basis-1/2 md:w-1/2 lg:w-auto space-y-6">
						<div className="pt-2 md:pt-0 space-y-4">
							<h3 className="font-semibold text-2xl text-light-100 dark:text-dark-100">General</h3>
							<div className="flex flex-col lg:flex-row gap-x-12 gap-y-2">
								<Dropdown name="theme" label="Theme" data={ themeOptions } value={ themeId } setValue={ setThemeId } />
								<Dropdown name="dateformat" label="Date format" data={ dateFormatOptions } value={ dateFormatId } setValue={ setDateFormatId } />
							</div>
						</div>
						<div className="space-y-4">
							<h3 className="font-semibold text-2xl text-light-100 dark:text-dark-100">Defaults</h3>
							<div className="flex flex-col lg:flex-row gap-x-12 gap-y-2">
								<Dropdown name="defaultcountry" label="Country" data={ countries } value={ defaultCountryId } setValue={ setDefaultCountryId } />
								<Dropdown name="defaultsorting" label="Sorting" data={ sortOptions } value={ defaultSortingId } setValue={ setDefaultSortingId } />
							</div>
						</div>
						<div className="space-y-4">
							<h3 className="font-semibold text-2xl text-light-100 dark:text-dark-100">Starred Users</h3>
							<div className="space-y-2">
								<h6 className="font-medium text-light-80 dark:text-dark-80">Starred ranking list coming soon. Right now, you&apos;re able to star users at users&apos; profile dialog.</h6>
								<h6 className="font-medium text-light-80 dark:text-dark-80">Total starred user: { starredUsers.length }</h6>
								<Button type="danger" label="Reset all users" onClick={ () => setShowResetUsersDialog(true) } />
							</div>
						</div>
						<div className="space-y-4">
							<h3 className="font-semibold text-2xl text-light-100 dark:text-dark-100">Logging</h3>
							<div className="space-y-2">
								<h6 className="font-medium text-light-80 dark:text-dark-80">These logs are stored locally for debugging purposes and never leave your browser. All logs will be automatically deleted upon closing.</h6>
								<h6 className="font-medium text-light-80 dark:text-dark-80">If any problems are found, feel free to submit feedbacks to GitHub issues along with these logs.</h6>
								<Button label="Open Logs" onClick={ () => setShowErrorDialog(true) } />
							</div>
							<div className="flex items-center gap-x-4">
								<h6 className="font-medium text-light-40 dark:text-dark-60">osuscorerank-web { getUpdateVersionString(VersionType.WEB_VERSION) }</h6>
								{ /* eslint-disable-next-line react/jsx-no-target-blank */ }
								<a href="https://github.com/shigeru22/osuscorerank-web" target="_blank" rel="external" className="opacity-40 hover:opacity-60 -z-10">
									<FontAwesomeIcon icon={ faGithub } className="text-2xl text-black dark:text-white" />
								</a>
							</div>
						</div>
					</div>
					<div className="xl:basis-1/2 md:w-1/2 lg:w-auto space-y-6">
						<div className="space-y-4">
							<h3 className="font-semibold text-2xl text-light-100 dark:text-dark-100">API</h3>
							<div className="space-y-2">
								<h6 className="font-medium text-light-80 dark:text-dark-80">Details on external API access will be added soon.</h6>
								<h6 className="font-medium text-light-80 dark:text-dark-80">API Status: { getApiStatusString() }</h6>
								<Button type="primary" label="Check Status" onClick={ () => handleApiTest() } />
							</div>
							<div className="flex items-center gap-x-4">
								<h6 className="font-medium text-light-40 dark:text-dark-60">osuscorerank-server { getUpdateVersionString(VersionType.API_VERSION) }</h6>
								{ /* eslint-disable-next-line react/jsx-no-target-blank */ }
								<a href="https://github.com/shigeru22/osuscorerank-server" target="_blank" rel="external" className="opacity-40 hover:opacity-60 -z-10">
									<FontAwesomeIcon icon={ faGithub } className="text-2xl text-black dark:text-white" />
								</a>
							</div>
						</div>
						<div className="space-y-4">
							<h3 className="font-semibold text-2xl text-light-100 dark:text-dark-100">WebAssembly</h3>
							<div className="space-y-2">
								<h6 className="font-medium text-light-80 dark:text-dark-80">
									{ /* eslint-disable-next-line react/jsx-no-target-blank */ }
									WebAssembly is temporarily disabled. See <a href="https://github.com/shigeru22/osuscorerank-web/issues/7" target="_blank" rel="external" className="text-light-100 dark:text-dark-100">this issue</a> for details.
								</h6>
								{ /*
									 * <h6 className="font-medium text-light-80 dark:text-dark-80">This runs greet() function and does a simple search test using compiled Wasm module.</h6>
									 * <h6 className="font-medium text-light-80 dark:text-dark-80">Message: { wasmMessage }</h6>
									 * <h6 className="font-medium text-light-80 dark:text-dark-80">Search test: { wasmStatus }</h6>
									 * <Button type="primary" label="Test Again" onClick={ () => getWasmGreetMessage() } />
									 */
								}
							</div>
							<div className="flex items-center gap-x-4">
								<h6 className="font-medium text-light-40 dark:text-dark-60">osuscorerank-web/src/wasm { getUpdateVersionString(VersionType.WEB_VERSION) }</h6>
								{ /* eslint-disable-next-line react/jsx-no-target-blank */ }
								<a href="https://github.com/shigeru22/osuscorerank-web/tree/main/src/wasm" target="_blank" rel="external" className="opacity-40 hover:opacity-60 -z-10">
									<FontAwesomeIcon icon={ faGithub } className="text-2xl text-black dark:text-white" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			{
				showResetUsersDialog &&
				<DimBackground>
					<Dialog htmlRef={ refResetStarredDialog } title="Reset All Users" onCancelClick={ () => setShowResetUsersDialog(false) } onOkayClick={ handleResetStarredUsers }>
						<div className="font-medium text-light-80 dark:text-dark-80">Remove all starred users?</div>
					</Dialog>
				</DimBackground>
			}
		</>
	);
}

export default Settings;
