export interface IResponseMessage {
	message: string;
}

export interface IResponseData<T> {
	message: string;
	data?: T;
}
