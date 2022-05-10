import filter from "lodash/filter";
import { IRankingListData } from "../types/components/RankingList";

export function getTableRowsFromViewport() {
	const width = window.innerWidth;
	const height = window.innerHeight;

	let baseRow = 5;

	if(width <= 768) {
		baseRow = 6;
	}
	else if(width >= 1536) {
		baseRow = 9;
	}

	if(height >= 600) {
		return baseRow + Math.floor((height - 608) / 34);
	}

	return baseRow;
}

export function getTableHeight(rows: number) {
	return rows > 0 ? (rows + 1) * 34 : 0;
}

export function searchFromTableData(data: IRankingListData[], query: string): IRankingListData[] {
	try {
		const lowercased = query.toLowerCase();

		const result = filter(data, item => (
			item.rank.toString().toLowerCase().includes(lowercased) ||
			item.userName.toLowerCase().includes(lowercased) ||
			item.score.toString().toLowerCase().includes(lowercased) ||
			item.pp.toString().toLowerCase().includes(lowercased)
		));

		return result;
	}
	catch {
		return [];
	}
}
