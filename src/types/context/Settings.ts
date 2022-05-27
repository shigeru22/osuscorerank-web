import { ICountryData } from "../data/Country";
import { ILogData } from "../Log";
import { IUpdateData } from "../Update";
import { LogType } from "../../utils/Logging";

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
	showMobileSidebar: boolean,
	showErrorDialog: boolean,
	countries: ICountryData[],
	updateData: IUpdateData | null;
	activeCountryId: number,
	setSettings: (data: Settings) => void,
	setShowMobileSidebar: (value: boolean) => void,
	setShowErrorDialog: (value: boolean) => void,
	setActiveCountryId: (id: number) => void,
	addLogData: (name: LogType, description: string) => void
}
