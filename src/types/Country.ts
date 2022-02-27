export interface ICountryData {
	countryId: number;
	countryName: string;
	countryCode: string;
}

export interface ICountryInactiveData extends ICountryData {
	recentlyInactive: number;
}
