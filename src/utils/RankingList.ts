import init, { search_object as searchObject } from "../wasm/pkg/osuinactivescore_wasm";
import { IRankingListData } from "../types/components/RankingList";

export function getTableRowsFromViewport() {
	const width = window.innerWidth;
	const height = window.innerHeight;

	const baseRow = width >= 1536 ? 9 : 5;

	if(height >= 600) {
		return baseRow + Math.floor((height - 600) / 34);
	}

	return baseRow;
}

export async function searchFromTableData(data: IRankingListData[], query: string): Promise<IRankingListData[]> {
	try {
		await init();

		const result: IRankingListData[] = JSON.parse(searchObject(data, query));
		return result;
	}
	catch {
		return [];
	}
}
