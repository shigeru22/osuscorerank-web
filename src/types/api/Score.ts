import { ICountryData } from "../Country";
import { IScoreData, IUserScoreData } from "../Score";

export interface ICountryScoreResponseData {
  country: ICountryData;
  rankings: IScoreData[];
  inactives: {
    recentlyInactive: number;
  };
  total: number;
}

export interface IGlobalScoreResponseData {
  rankings: IUserScoreData[];
  inactives: {
    recentlyInactive: number;
  };
  total: number;
}

export interface IMultipleUserResponseData {
  scores: IUserScoreData[];
}
