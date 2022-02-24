import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { settingsContext } from "../App";
import Dropdown from "../../components/shared/inputs/Dropdown";
import Button from "../../components/shared/inputs/Button";
import init, { greet, search_object as searchObject } from "../../wasm/pkg/osuinactivescore_wasm";
import { Settings as SettingsData } from "../../types/context/Settings";
import { IDropdownData } from "../../types/components/Dropdown";
import { IRankingListData } from "../../types/components/RankingList";

function Settings() {
	const { settings, setSettings } = useContext(settingsContext);

	const [ themeId, setThemeId ] = useState(settings.themeId);
	const [ dateFormatId, setDateFormatId ] = useState(settings.dateFormatId);
	const [ defaultCountryId, setDefaultCountryId ] = useState(settings.defaultCountryId);
	const [ defaultSortingId, setDefaultSortingId ] = useState(settings.defaultSortingId);

	const [ wasmMessage, setWasmMessage ] = useState("Testing...");
	const [ wasmStatus, setWasmStatus ] = useState("Testing...");

	useEffect(() => {
		getWasmGreetMessage();
	}, []);

	useEffect(() => {
		const newSettings: SettingsData = {
			themeId,
			dateFormatId,
			defaultCountryId,
			defaultSortingId,
			starredUserId: settings.starredUserId
		};

		setSettings(newSettings);
	}, [ themeId, dateFormatId, defaultCountryId, defaultSortingId, settings.starredUserId, setSettings ]);

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

	async function getWasmGreetMessage() {
		setWasmMessage("Testing...");
		setWasmStatus("Testing...");

		try {
			await init();

			const message = greet();
			setWasmMessage(message);

			const items: IRankingListData[] = [
				{
					id: 1, rank: 1,	userName: "Beta",	score: 1223535,	pp: 324, delta: 0
				},
				{
					id: 2, rank: 2, userName: "Alpha", score: 1123526, pp: 298, delta: 0
				},
				{
					id: 3, rank: 3, userName: "Bubba", score: 1098272, pp: 277, delta: 0
				}
			];
			const query = "b";

			const result: IRankingListData[] = JSON.parse(searchObject(items, query));
			if(result.length === 2 && (
				_.isEqual(result[0], items[0]) &&
				_.isEqual(result[1], items[2])
			)) {
				setWasmStatus("Passed");
			}
			else {
				setWasmStatus("Failed");
			}
		}
		catch {
			setWasmMessage("Failed");
			setWasmStatus("Failed");
		}
	}

	return (
		<div className="px-8 py-0 md:px-14 md:py-8 lg:py-12 md:space-y-6">
			<h1 className="hidden md:inline font-semibold text-3xl text-light-100 dark:text-dark-100">Settings</h1>
			<div className="flex flex-col md:flex-row gap-x-12 gap-y-4 pb-6">
				<div className="space-y-6">
					<div className="pt-2 md:pt-0 space-y-4">
						<h3 className="font-semibold text-2xl text-light-100 dark:text-dark-100">General</h3>
						<div className="flex flex-col md:flex-row gap-x-12 gap-y-2">
							<Dropdown name="theme" label="Theme" data={ themeDropdownData } value={ themeId } setValue={ setThemeId } />
							<Dropdown name="dateformat" label="Date format" data={ dateFormatDropdownData } value={ dateFormatId } setValue={ setDateFormatId } />
						</div>
					</div>
					<div className="space-y-4">
						<h3 className="font-semibold text-2xl text-light-100 dark:text-dark-100">Defaults</h3>
						<div className="flex flex-col md:flex-row gap-x-12 gap-y-2">
							<Dropdown name="defaultcountry" label="Country" data={ countryDropdownData } value={ defaultCountryId } setValue={ setDefaultCountryId } />
							<Dropdown name="defaultsorting" label="Sorting" data={ sortingDropdownData } value={ defaultSortingId } setValue={ setDefaultSortingId } />
						</div>
					</div>
					<div className="space-y-4">
						<h3 className="font-semibold text-2xl text-light-100 dark:text-dark-100">Starred</h3>
						<div className="space-y-2">
							<h6 className="font-medium text-light-80 dark:text-dark-80">Total starred user: 15</h6>
							<h6 className="font-medium text-light-80 dark:text-dark-80">Total starred user (including active): 17</h6>
							<Button type="danger" label="Reset all users" />
						</div>
						<h6 className="font-medium text-light-40 dark:text-dark-60">osu-inactive-score 1.0.0</h6>
					</div>
				</div>
				<div className="space-y-6">
					<div className="space-y-4">
						<h3 className="font-semibold text-2xl text-light-100 dark:text-dark-100">API</h3>
						<div className="space-y-2">
							<h6 className="font-medium text-light-80 dark:text-dark-80">Details on external API access will be added soon.</h6>
							<h6 className="font-medium text-light-80 dark:text-dark-80">API Status: Working normally</h6>
							<Button type="primary" label="Check Status" />
						</div>
						<h6 className="font-medium text-light-40 dark:text-dark-60">osuinactive-api 1.0.0</h6>
					</div>
					<div className="space-y-4">
						<h3 className="font-semibold text-2xl text-light-100 dark:text-dark-100">WebAssembly</h3>
						<div className="space-y-2">
							<h6 className="font-medium text-light-80 dark:text-dark-80">This runs greet() function and does a simple search test using compiled Wasm module.</h6>
							<h6 className="font-medium text-light-80 dark:text-dark-80">Message: { wasmMessage }</h6>
							<h6 className="font-medium text-light-80 dark:text-dark-80">Search test: { wasmStatus }</h6>
							<Button type="primary" label="Test Again" onClick={ () => getWasmGreetMessage() } />
						</div>
						<h6 className="font-medium text-light-40 dark:text-dark-60">osuinactivescore-sort-wasm 1.0.0</h6>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
