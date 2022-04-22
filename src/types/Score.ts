import { IUserData, IUserCountryData } from "./User";

export interface IScoreBaseData {
	scoreId: number;
	score: number | string;
	pp: number;
}

export interface IUserScoreData extends IScoreBaseData {
	user: IUserData;
}

export interface IUserScoreCountryData extends IScoreBaseData {
	user: IUserCountryData;
}
