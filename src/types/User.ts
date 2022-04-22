import { ICountryData } from "./Country";

export interface IUserData {
	userId: number;
	userName: string;
	osuId: number;
	isActive: boolean;
}

export interface IUserCountryData extends IUserData {
	country: ICountryData;
}
