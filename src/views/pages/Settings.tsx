import React, { useState } from "react";
import Dropdown from "../../components/shared/inputs/Dropdown";
import Button from "../../components/shared/inputs/Button";
import { IDropdownData } from "../../types/components/Dropdown";

function Settings() {
	const [ themeId, setThemeId ] = useState(1);
	const [ dateFormatId, setDateFormatId ] = useState(3);
	const [ defaultCountryId, setDefaultCountryId ] = useState(1);
	const [ defaultSortingId, setDefaultSortingId ] = useState(1);

	const themeDropdownData: IDropdownData[] = [
		{
			id: 1,
			name: "System Default"
		},
		{
			id: 2,
			name: "Light"
		},
		{
			id: 3,
			name: "Dark"
		}
	];

	const dateFormatDropdownData: IDropdownData[] = [
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

	const countryDropdownData: IDropdownData[] = [
		{
			id: 1,
			name: "Indonesia"
		},
		{
			id: 2,
			name: "Singapore"
		},
		{
			id: 3,
			name: "Japan"
		},
		{
			id: 4,
			name: "United States"
		}
	];

	const sortingDropdownData: IDropdownData[] = [
		{
			id: 1,
			name: "Score"
		},
		{
			id: 2,
			name: "pp"
		}
	];

	return (
		<div className="px-14 py-12 space-y-6">
			<h1 className="font-semibold text-3xl text-light-100">Starred</h1>
			<div className="flex gap-x-12">
				<div className="space-y-6">
					<div className="space-y-4">
						<h3 className="font-semibold text-2xl text-light-100">General</h3>
						<div className="flex gap-x-12">
							<Dropdown name="theme" label="Theme" data={ themeDropdownData } value={ themeId } setValue={ setThemeId } />
							<Dropdown name="dateformat" label="Date format" data={ dateFormatDropdownData } value={ dateFormatId } setValue={ setDateFormatId } />
						</div>
					</div>
					<div className="space-y-4">
						<h3 className="font-semibold text-2xl text-light-100">Rankings</h3>
						<div className="flex gap-x-12">
							<Dropdown name="defaultcountry" label="Default country" data={ countryDropdownData } value={ defaultCountryId } setValue={ setDefaultCountryId } />
							<Dropdown name="defaultsorting" label="Default sorting" data={ sortingDropdownData } value={ defaultSortingId } setValue={ setDefaultSortingId } />
						</div>
					</div>
					<div className="space-y-4">
						<h3 className="font-semibold text-2xl text-light-100">Starred</h3>
						<div className="space-y-2">
							<h6 className="font-medium text-light-80">Total starred user: 15</h6>
							<h6 className="font-medium text-light-80">Total starred user (including active): 17</h6>
							<Button type="danger" label="Reset all users" />
						</div>
						<h6 className="font-medium text-light-40">osu-inactive-score 1.0.0</h6>
					</div>
				</div>
				<div>
					<div className="space-y-4">
						<h3 className="font-semibold text-2xl text-light-100">API</h3>
						<div className="space-y-2">
							<h6 className="font-medium text-light-80">Details on external API access will be added soon.</h6>
							<h6 className="font-medium text-light-80">API Status: Working normally</h6>
							<Button type="primary" label="Check Status" />
						</div>
						<h6 className="font-medium text-light-40">osuinactive-api 1.0.0</h6>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
