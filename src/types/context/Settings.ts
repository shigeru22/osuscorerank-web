import { ICountryData } from "../data/Country";
import { ILogData } from "../Log";

export interface Settings {
	themeId: number;
	dateFormatId: number;
	defaultCountryId: number;
	defaultSortingId: number;
	starredUserId: number[];
}

export type SettingsContext = {
	settings: Settings,
	logs: ILogData[],
	showErrorDialog: boolean,
	countries: ICountryData[],
	activeCountryId: number,
	setSettings: (data: Settings) => void,
	setShowErrorDialog: (value: boolean) => void,
	setActiveCountryId: (id: number) => void,
	addLogData: (name: string, description: string) => void
}
