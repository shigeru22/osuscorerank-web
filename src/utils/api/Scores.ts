import axios from "axios";
import _ from "lodash";
import { ICountryScoreResponseData } from "../../types/api/Score";
import { IResponseData } from "../../types/api/Response";

const API_URL = process.env.REACT_APP_API_URL;

export async function getCountryScores(countryId: number, sort: number ): Promise<IResponseData<ICountryScoreResponseData>> {
	try {
		const response = await axios.get(`${ API_URL }/scores/country/${ countryId }`, {
			params: {
				sort: sort
			}
		});

		const ret = response.data as IResponseData<ICountryScoreResponseData>;
		return ret;
	}
	catch (e) {
		let message = "Unknown error occurred.";

		if(axios.isAxiosError(e) || _.isError(e)) {
			message = e.message;
		}

		const ret: IResponseData<ICountryScoreResponseData> = {
			message: message
		};

		return ret;
	}
}
