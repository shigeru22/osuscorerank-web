import axios from "axios";
import _ from "lodash";
import { IResponseData } from "../../types/api/Response";
import { IUserResponseData } from "../../types/api/User";

const API_URL = process.env.REACT_APP_API_URL;

export async function getUserData(id: number): Promise<IResponseData<IUserResponseData>> {
	try {
		const response = await axios.get(`${ API_URL }/scores/user/${ id }`);

		const ret = response.data as IResponseData<IUserResponseData>;
		return ret;
	}
	catch (e) {
		let message = "Unknown error occurred.";

		if(axios.isAxiosError(e) || _.isError(e)) {
			message = e.message;
		}

		const ret: IResponseData<IUserResponseData> = {
			message: message
		};

		return ret;
	}
}
