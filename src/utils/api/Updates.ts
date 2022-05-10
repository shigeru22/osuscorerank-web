import axios from "axios";
import isError from "lodash/isError";
import { IResponseData } from "../../types/api/Response";
import { IUpdateResponseData } from "../../types/api/Update";

const API_URL = process.env.REACT_APP_API_URL;

export async function getLatestUpdate(): Promise<IResponseData<IUpdateResponseData>> {
	try {
		const response = await axios.get(`${ API_URL }/updates`);

		const ret = response.data as IResponseData<IUpdateResponseData>;
		return ret;
	}
	catch (e) {
		let message = "Unknown error occurred.";

		if(axios.isAxiosError(e) || isError(e)) {
			message = e.message;
		}

		const ret: IResponseData<IUpdateResponseData> = {
			message: message
		};

		return ret;
	}
}
