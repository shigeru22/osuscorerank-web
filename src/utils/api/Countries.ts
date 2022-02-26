import axios from "axios";
import _ from "lodash";
import { ICountryData } from "../../types/api/Country";
import { IResponseData } from "../../types/api/Response";

const API_URL = process.env.REACT_APP_API_URL;

export async function getAllCountries(): Promise<IResponseData<ICountryData>> {
	try {
		const response = await axios.get(`${ API_URL }/countries`);

		const ret = response.data as IResponseData<ICountryData>;
		return ret;
	}
	catch (e) {
		let message = "Unknown error occurred.";

		if(axios.isAxiosError(e) || _.isError(e)) {
			message = e.message;
		}

		const ret: IResponseData<ICountryData> = {
			message: message
		};

		return ret;
	}
}
