import { IUserCountryData } from "../User";

export interface IUserCountryDetailData extends IUserCountryData {
	userId: number;
}

export interface IUserResponseData {
	user: IUserCountryDetailData;
}
