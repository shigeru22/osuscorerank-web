export interface ICountryData {
	countries: {
		countryId: number;
		countryName: string;
		countryCode: string;
		recentlyInactive: number;
	}[];
}
