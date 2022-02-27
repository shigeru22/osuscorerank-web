import { IUserData, IUserCountryData } from "./User";

export interface IScoreData {
	scoreId: number;
	user: IUserData;
	score: number | string;
	pp: number;
	globalRank: number;
	delta: number;
}

export interface IUserScoreData extends IScoreData {
	user: IUserCountryData;
}
