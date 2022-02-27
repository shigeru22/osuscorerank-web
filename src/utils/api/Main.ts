import axios from "axios";
import _ from "lodash";
import { IResponseMessage } from "../../types/api/Response";

const API_URL = process.env.REACT_APP_API_URL;

export async function getGreetingData() {
	try {
		const response = await axios.get(`${ API_URL }`);

		const ret = response.data as IResponseMessage;
		return ret;
	}
	catch (e) {
		let message = "Unknown error occurred.";

		if(axios.isAxiosError(e) || _.isError(e)) {
			message = e.message;
		}

		const ret: IResponseMessage = {
			message: message
		};

		return ret;
	}
}
