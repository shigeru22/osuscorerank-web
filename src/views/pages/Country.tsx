import React from "react";
import RankingList from "../../components/shared/RankingList";
import { IRankingListData } from "../../types/components/RankingList";

function Country() {
	const displayedData: IRankingListData[] = [
		{
			id: 1,
			rank: 1,
			userName: "Test 1",
			score: 2342432424,
			pp: 2342,
			delta: 1
		}
	];

	function handleRowDelete(value: number) {
		console.log(value);
	}

	return (
		<div className="p-4">
			<h1>Country page</h1>
			<RankingList data={ displayedData } onDeleteClick={ handleRowDelete } />
			<RankingList data={ displayedData } />
		</div>
	);
}

export default Country;
