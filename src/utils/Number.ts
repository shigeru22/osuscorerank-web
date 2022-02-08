import { IRankingListData } from "../types/components/RankingList";

export function numberToSeparatedThousandsString(num: number) {
	/*
	 * regex taken from:
	 * https://stackoverflow.com/a/2901298
	 */

	return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function getRankingListTotalPages(data: IRankingListData[], itemsPerPage: number) {
	return Math.ceil(data.length / itemsPerPage);
}
