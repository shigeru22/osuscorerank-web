import { ICountryData } from "../data/Country";

export interface Settings {
	themeId: number;
	dateFormatId: number;
	defaultCountryId: number;
	defaultSortingId: number;
	starredUserId: number[];
}

export type SettingsContext = {
	settings: Settings,
	countries: ICountryData[],
	activeCountryId: number,
	setSettings: (data: Settings) => void,
	setActiveCountryId: (id: number) => void
}
