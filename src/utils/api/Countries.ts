import axios from "axios";
import isError from "lodash/isError";
import { IResponseData } from "../../types/api/Response";
import { ICountryInactiveResponseData } from "../../types/api/Country";

const API_URL = process.env.REACT_APP_API_URL;

export async function getAllCountries(): Promise<IResponseData<ICountryInactiveResponseData>> {
	try {
		const response = await axios.get(`${ API_URL }/countries`);

		const ret = response.data as IResponseData<ICountryInactiveResponseData>;
		return ret;
	}
	catch (e) {
		let message = "Unknown error occurred.";

		if(axios.isAxiosError(e) || isError(e)) {
			message = e.message;
		}

		const ret: IResponseData<ICountryInactiveResponseData> = {
			message: message
		};

		return ret;
	}
}
