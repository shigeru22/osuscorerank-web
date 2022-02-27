import React, { useState, useRef, useEffect, useContext } from "react";
import _ from "lodash";
import StatsCard from "../../components/shared/StatsCard";
import RankingList from "../../components/shared/RankingList";
import Pagination from "../../components/shared/Pagination";
import TextInput from "../../components/shared/inputs/Text";
import Dropdown from "../../components/shared/inputs/Dropdown";
import SearchButton from "../../components/shared/mobile/SearchButton";
import DimBackground from "../../components/shared/DimBackground";
import ProfileDialog from "../../components/shared/ProfileDialog";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { settingsContext } from "../App";
import { getRankingListTotalPages } from "../../utils/Number";
import { getTableRowsFromViewport, getTableHeight, searchFromTableData } from "../../utils/RankingList";
import { sortOptions } from "../../utils/Options";
import { IRankingListData } from "../../types/components/RankingList";
import { Settings as SettingsData } from "../../types/context/Settings";

function Global() {
	const { settings, logs, setSettings, addLogData } = useContext(settingsContext);

	const [ starredUsers, setStarredUsers ] = useState(settings.starredUserId);

	const [ showProfileDialog, setShowProfileDialog ] = useState(false);
	const [ selectedUserId, setSelectedUserId ] = useState(0);

	const [ showErrorDialog, setShowErrorDialog ] = useState(true);

	const [ searchQuery, setSearchQuery ] = useState("");
	const [ selectedSortId, setSelectedSortId ] = useState(1);
	const [ tableRowsPerPage, setTableRowsPerPage ] = useState(getTableRowsFromViewport());

	const [ updateDebounce, setUpdateDebounce ] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);
	const [ searchDebounce, setSearchDebounce ] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);

	const [ rankingPage, setRankingPage ] = useState(1);
	const [ rankingData, setRankingData ] = useState<IRankingListData[]>([]);
	const [ rankingDataResults, setRankingDataResults ] = useState<IRankingListData[]>([]);
	const [ displayedRankingData, setDisplayedRankingData ] = useState<IRankingListData[]>([]);

	const refUserDialog = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if(_.isEmpty(searchQuery)) {
			setRankingDataResults(rankingData);
			return;
		}

		if(!_.isUndefined(searchDebounce)) {
			clearTimeout(searchDebounce);
		}

		setSearchDebounce(setTimeout(async () => {
			addLogData("Info", "searchDebounce timeout reached. Searching data...");

			const result = await searchFromTableData(rankingData, searchQuery);
			setRankingDataResults(result);
			setRankingPage(1);
		}, 250));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ searchQuery ]);

	useEffect(() => {
		function updateWindowDimensions() {
			if(!_.isUndefined(updateDebounce)) {
				clearTimeout(updateDebounce);
			}

			setUpdateDebounce(setTimeout(() => {
				addLogData("Info", "updateDebounce timeout reached. Updating display row count...");

				const before = tableRowsPerPage;
				const after = getTableRowsFromViewport();

				if(before !== after) {
					setRankingPage(1);
					setTableRowsPerPage(getTableRowsFromViewport());
				}
			}, 200));
		}

		window.addEventListener("resize", updateWindowDimensions);

		return () => {
			window.removeEventListener("resize", updateWindowDimensions);
		};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ updateDebounce ]);

	useEffect(() => {
		const temp: IRankingListData[] = [];
		for(let i = (rankingPage - 1) * tableRowsPerPage; i < rankingPage * tableRowsPerPage; i++) {
			temp.push(rankingDataResults[i]);
		}

		setDisplayedRankingData(temp);

		if(!_.isUndefined(updateDebounce)) {
			clearTimeout(updateDebounce);
			setUpdateDebounce(undefined);
		}

	/* updateDebounce should not be its dependency */
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ rankingPage, rankingDataResults, tableRowsPerPage ]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if(refUserDialog.current && !refUserDialog.current.contains(event.target as Element)) {
				setShowProfileDialog(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const data: IRankingListData[] = [
			{
				id: 1, rank: 1, userName: "User 1", score: 183259761552, pp: 5241, delta: 0
			},
			{
				id: 2, rank: 2, userName: "User 3", score: 162688120325, pp: 6230, delta: 0
			},
			{
				id: 3, rank: 3, userName: "User 2", score: 132981738903, pp: 3984, delta: -1
			},
			{
				id: 4, rank: 4, userName: "User 4", score: 128551301158, pp: 5241, delta: 0
			},
			{
				id: 5, rank: 5, userName: "User 5", score: 117492522634, pp: 3682, delta: -1
			},
			{
				id: 6, rank: 6, userName: "User 1", score: 183259761552, pp: 5241, delta: 0
			},
			{
				id: 7, rank: 7, userName: "User 3", score: 162688120325, pp: 6230, delta: 0
			},
			{
				id: 8, rank: 8, userName: "User 2", score: 132981738903, pp: 3984, delta: -1
			},
			{
				id: 9, rank: 9, userName: "User 4", score: 128551301158, pp: 5241, delta: 0
			},
			{
				id: 10, rank: 10, userName: "User 5", score: 117492522634, pp: 3682, delta: -1
			},
			{
				id: 11, rank: 11, userName: "User 1", score: 183259761552, pp: 5241, delta: 0
			},
			{
				id: 12, rank: 12, userName: "User 3", score: 162688120325, pp: 6230, delta: 0
			},
			{
				id: 13, rank: 13, userName: "User 2", score: 132981738903, pp: 3984, delta: -1
			},
			{
				id: 14, rank: 14, userName: "User 4", score: 128551301158, pp: 5241, delta: 0
			},
			{
				id: 15, rank: 15, userName: "User 5", score: 117492522634, pp: 3682, delta: -1
			},
			{
				id: 16, rank: 16, userName: "User 1", score: 183259761552, pp: 5241, delta: 0
			},
			{
				id: 17, rank: 17, userName: "User 3", score: 162688120325, pp: 6230, delta: 0
			},
			{
				id: 18, rank: 18, userName: "User 2", score: 132981738903, pp: 3984, delta: -1
			},
			{
				id: 19, rank: 19, userName: "User 4", score: 128551301158, pp: 5241, delta: 0
			}
		];

		addLogData("Info", "Fetching global ranking data...");
		setRankingData(data);
		setRankingDataResults(data);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleUserClick(id: number) {
		setSelectedUserId(id);
		setShowProfileDialog(true);
	}

	function handleUserStarClick() {
		const newSettings: SettingsData = {
			themeId: settings.themeId,
			dateFormatId: settings.dateFormatId,
			defaultCountryId: settings.defaultCountryId,
			defaultSortingId: settings.defaultSortingId,
			starredUserId: settings.starredUserId
		};

		if(_.indexOf(settings.starredUserId, selectedUserId) < 0) {
			newSettings.starredUserId.push(selectedUserId);
		}
		else {
			newSettings.starredUserId = _.filter(newSettings.starredUserId, id => id !== selectedUserId);
		}

		setSettings(newSettings);
		setStarredUsers([ ...newSettings.starredUserId ]);

		addLogData("Info", `Added user ID ${ selectedUserId } to starred users list.`);
	}

	return (
		<div className="px-0 py-0 md:px-14 md:py-8 lg:py-12 md:space-y-6">
			<div className="hidden md:block space-y-6">
				<div className="flex justify-between items-start">
					<h1 className="font-semibold text-3xl text-light-100 dark:text-dark-100">Global</h1>
					<h2 className="font-semibold text-light-60 dark:text-dark-80">Last updated: 2022/01/27</h2>
				</div>
			</div>
			<div className="2xl:flex 2xl:justify-between 2xl:gap-x-6 gap-y-6 space-y-6 2xl:space-y-0">
				<div className="flex flex-col gap-y-6">
					<h3 className="px-8 pt-2 md:px-0 md:py-0 font-semibold text-2xl text-light-100 dark:text-dark-100">Statistics</h3>
					<div className="flex 2xl:flex-col items-start gap-x-4 gap-y-4 px-8 md:px-0 overflow-x-auto">
						<StatsCard title="Recently Inactive" data="16" subtitle="+ 1 since last month" />
						<StatsCard title="Total Inactives" data="143" subtitle="+ 5 since last month" />
					</div>
				</div>
				<div className="flex flex-col md:flex-row items-start gap-x-6 gap-y-4">
					<div className="flex md:hidden justify-between items-center w-full px-8">
						<Dropdown name="sort" label="Sort" data={ sortOptions } value={ selectedSortId } setValue={ setSelectedSortId } />
						<SearchButton value={ searchQuery } setValue={ setSearchQuery } />
					</div>
					<div className="flex flex-col md:items-center gap-y-4 w-full md:w-auto">
						<h3 className="hidden 2xl:block self-start text-left font-semibold text-2xl text-light-100 dark:text-dark-100">Rankings</h3>
						<div className="flex 2xl:flex-col items-start px-8 md:px-0 overflow-x-auto" style={ { minHeight: getTableHeight(tableRowsPerPage) } }> { /* calculate table height programatically */ }
							<RankingList data={ displayedRankingData } onUserClick={ handleUserClick } />
						</div>
						<div className="hidden md:flex justify-center w-full">
							<Pagination active={ rankingPage } total={ getRankingListTotalPages(rankingDataResults, tableRowsPerPage) } setValue={ setRankingPage } />
						</div>
						{
							showProfileDialog &&
							<DimBackground>
								<ProfileDialog htmlRef={ refUserDialog } userId={ selectedUserId } starred={ _.indexOf(starredUsers, selectedUserId) >= 0 } onCloseClick={ () => setShowProfileDialog(false) } onStarClick={ () => handleUserStarClick() } />
							</DimBackground>
						}
					</div>
					<div className="hidden md:flex 2xl:hidden flex-col gap-y-4 pt-1.25">
						<TextInput name="search" label="Search player" icon={ faSearch } value={ searchQuery } setValue={ setSearchQuery } />
						<Dropdown name="sort" label="Sort" data={ sortOptions } value={ selectedSortId } setValue={ setSelectedSortId } />
					</div>
					<div className="flex justify-center md:hidden w-full">
						<Pagination active={ rankingPage } total={ getRankingListTotalPages(rankingDataResults, tableRowsPerPage) } setValue={ setRankingPage } />
					</div>
				</div>
				<div className="hidden 2xl:flex flex-col gap-y-4 pt-13">
					<TextInput name="search" label="Search player" icon={ faSearch } value={ searchQuery } setValue={ setSearchQuery } />
					<Dropdown name="sort" label="Sort" data={ sortOptions } value={ selectedSortId } setValue={ setSelectedSortId } />
				</div>
			</div>
		</div>
	);
}

export default Global;
