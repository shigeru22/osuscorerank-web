import { LogType } from "../utils/Logging";

export interface ILogData {
	id: number;
	time: Date;
	name: LogType;
	description: string;
}
