import { ICountryData } from "../Country";
import { IUserScoreData, IUserScoreCountryData } from "../Score";

export interface IUserScoreDetailData extends IUserScoreData {
  scoreId: number;
}

export interface IUserCountryScoreDetailData extends IUserScoreCountryData {
  scoreId: number;
}

export interface ICountryScoreResponseData {
  country: ICountryData;
  scores: IUserScoreDetailData[];
  length: number;
}

export interface IGlobalScoreResponseData {
  scores: IUserCountryScoreDetailData[];
  length: number;
}

export interface IUserScoreResponseData {
  score: IUserCountryScoreDetailData;
}

export interface IMultipleUserResponseData {
  scores: IUserCountryScoreDetailData[];
}
