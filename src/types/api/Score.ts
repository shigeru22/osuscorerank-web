import { ICountryData } from "../Country";
import { IScoreData } from "../Score";

export interface ICountryScoreResponseData {
  country: ICountryData;
  rankings: IScoreData[];
  inactives: {
    recentlyInactive: number;
  };
  total: number;
}
