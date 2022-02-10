import React, { useState, useEffect } from "react";
import _ from "lodash";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import StatsCard from "../../components/shared/StatsCard";
import RankingList from "../../components/shared/RankingList";
import Pagination from "../../components/shared/Pagination";
import TextInput from "../../components/shared/inputs/Text";
import Dropdown from "../../components/shared/inputs/Dropdown";
import { getRankingListTotalPages } from "../../utils/Number";
import { getTableRowsFromViewport } from "../../utils/RankingList";
import { IRankingListData } from "../../types/components/RankingList";
import { IDropdownData } from "../../types/components/Dropdown";

function Starred() {
	const [ searchQuery, setSearchQuery ] = useState("");
	const [ selectedSortId, setSelectedSortId ] = useState(1);
	const [ tableRowsPerPage, setTableRowsPerPage ] = useState(getTableRowsFromViewport());

	const [ updateDebounce, setUpdateDebounce ] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);

	const [ rankingPage, setRankingPage ] = useState(1);
	const [ rankingData, setRankingData ] = useState<IRankingListData[]>([]);
	const [ displayedRankingData, setDisplayedRankingData ] = useState<IRankingListData[]>([]);

	const sortOptions: IDropdownData[] = [
		{
			id: 1, name: "Score"
		},
		{
			id: 2, name: "pp"
		}
	];

	useEffect(() => {
		function updateWindowDimensions() {
			if(!_.isUndefined(updateDebounce)) {
				clearTimeout(updateDebounce);
			}

			setUpdateDebounce(setTimeout(() => {
				setTableRowsPerPage(getTableRowsFromViewport());
			}, 200));
		}

		window.addEventListener("resize", updateWindowDimensions);

		return () => {
			window.removeEventListener("resize", updateWindowDimensions);
		};
	}, [ updateDebounce ]);

	useEffect(() => {
		const temp: IRankingListData[] = [];
		for(let i = (rankingPage - 1) * tableRowsPerPage; i < rankingPage * tableRowsPerPage; i++) {
			temp.push(rankingData[i]);
		}

		setDisplayedRankingData(temp);

		if(!_.isUndefined(updateDebounce)) {
			clearTimeout(updateDebounce);
			setUpdateDebounce(undefined);
		}

	/* updateDebounce should not be its dependency */
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ rankingPage, rankingData, tableRowsPerPage ]);

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
			}
		];

		setRankingData(data);
	}, []);

	return (
		<div className="px-14 py-12 space-y-6">
			<div className="flex justify-between items-start">
				<h1 className="font-semibold text-3xl text-light-100">Starred</h1>
				<h2 className="font-semibold text-light-60">Last updated: 2022/01/27</h2>
			</div>
			<div className="2xl:flex 2xl:justify-between 2xl:gap-x-6 gap-y-6 space-y-6 2xl:space-y-0">
				<div className="flex flex-col gap-y-6">
					<h3 className="font-semibold text-2xl text-light-100">Statistics</h3>
					<div className="flex 2xl:flex-col items-start gap-x-4 gap-y-4">
						<StatsCard title="Starred" data="27" />
						<StatsCard title="Recently Active" data="0" subtitle="+ 0 since last month" />
					</div>
				</div>
				<div className="flex items-start gap-x-6">
					<div className="flex flex-col items-center gap-y-4">
						<h3 className="hidden 2xl:block self-start text-left font-semibold text-2xl text-light-100">Rankings</h3>
						<RankingList data={ displayedRankingData } />
						<Pagination active={ rankingPage } total={ getRankingListTotalPages(rankingData, 5) } setValue={ setRankingPage } />
					</div>
					<div className="flex 2xl:hidden flex-col gap-y-4 pt-1.25">
						<TextInput name="search" label="Search player" icon={ faSearch } value={ searchQuery } setValue={ setSearchQuery } />
						<Dropdown name="sort" label="Sort" data={ sortOptions } value={ selectedSortId } setValue={ setSelectedSortId } />
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

export default Starred;
