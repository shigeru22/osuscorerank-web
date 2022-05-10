import isError from "lodash/isError";
import isNull from "lodash/isNull";
import { Settings } from "../types/context/Settings";

const SETTINGS_KEY = "osuinactive-settings";

const DEFAULT_SETTINGS: Settings = {
	themeId: 1,
	dateFormatId: 1,
	defaultCountryId: 1,
	defaultSortingId: 1,
	starredUserId: []
};

export function getDefaultSettings(): Settings {
	return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
}

export function getSettingsData(): Settings {
	/* TODO: test for quota exceeded error using Safari */

	let ret: Settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
	const rawSettings = localStorage.getItem(SETTINGS_KEY);

	if(isNull(rawSettings)) {
		setSettingsData(ret);
		return ret;
	}

	ret = JSON.parse(rawSettings);

	return ret;
}

export function setSettingsData(data: Settings) {
	const temp = JSON.stringify(data);

	try {
		localStorage.setItem(SETTINGS_KEY, temp);
		return temp.length;
	}
	catch (err) {
		if(isError(err)) {
			return -1; // quota exceeded error
		}
		else {
			return -2; // unknown error
		}
	}
}
