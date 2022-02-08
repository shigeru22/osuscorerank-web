import React, { useState, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import StatsCard from "../../components/shared/StatsCard";
import RankingList from "../../components/shared/RankingList";
import Pagination from "../../components/shared/Pagination";
import TextInput from "../../components/shared/inputs/Text";
import Dropdown from "../../components/shared/inputs/Dropdown";
import { getRankingListTotalPages } from "../../utils/Number";
import { IRankingListData } from "../../types/components/RankingList";
import { IDropdownData } from "../../types/components/Dropdown";

function Global() {
	const [ searchQuery, setSearchQuery ] = useState("");
	const [ selectedSortId, setSelectedSortId ] = useState(1);

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
		const temp: IRankingListData[] = [];
		for(let i = (rankingPage - 1) * 5; i < rankingPage * 5; i++) {
			temp.push(rankingData[i]);
		}

		setDisplayedRankingData(temp);
	}, [ rankingPage, rankingData ]);

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

		setRankingData(data);
	}, []);

	return (
		<div className="px-14 py-12 space-y-6">
			<h1 className="font-semibold text-3xl text-light-100">Global</h1>
			<h3 className="font-semibold text-2xl text-light-100">Statistics</h3>
			<div className="flex items-start gap-x-4">
				<StatsCard title="Recently Inactive" data="16" subtitle="+ 1 since last month" />
				<StatsCard title="Total Inactives" data="143" subtitle="+ 5 since last month" />
			</div>
			<div className="flex items-start gap-x-6">
				<div className="flex flex-col justify-between items-center h-64">
					<RankingList data={ displayedRankingData } />
					<Pagination active={ rankingPage } total={ getRankingListTotalPages(rankingData, 5) } setValue={ setRankingPage } />
				</div>
				<div className="flex flex-col gap-y-4 pt-1.25">
					<TextInput name="search" label="Search player" icon={ faSearch } value={ searchQuery } setValue={ setSearchQuery } />
					<Dropdown name="sort" label="Sort" data={ sortOptions } value={ selectedSortId } setValue={ setSelectedSortId } />
				</div>
			</div>
		</div>
	);
}

export default Global;
