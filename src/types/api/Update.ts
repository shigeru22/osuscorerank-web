import { IUpdateData } from "../Update";

export interface IUpdateResponseData {
	updateData: IUpdateData;
}

export interface IUpdatesResponseData {
	updatesData: IUpdateData[];
	length: number;
}
