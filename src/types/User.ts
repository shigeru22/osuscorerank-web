import { ICountryData } from "./Country";

export interface IUserData {
	userId: number;
	userName: string;
	osuId: number;
}

export interface IUserCountryData extends IUserData {
	country: ICountryData;
}
