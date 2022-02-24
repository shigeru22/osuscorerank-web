import { IDropdownData } from "../types/components/Dropdown";

export const sortOptions: IDropdownData[] = [
	{
		id: 1, name: "Score"
	},
	{
		id: 2, name: "pp"
	}
];

export const themeOptions: IDropdownData[] = [
	{
		id: 1, name: "System Default"
	},
	{
		id: 2, name: "Light"
	},
	{
		id: 3, name: "Dark"
	}
];

export const dateFormatOptions: IDropdownData[] = [
	{
		id: 1,
		name: "DD/MM/YYYY"
	},
	{
		id: 2,
		name: "MM/DD/YYYY"
	},
	{
		id: 3,
		name: "YYYY/MM/DD"
	}
];
