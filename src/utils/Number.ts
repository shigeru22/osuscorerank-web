export function numberToSeparatedThousandsString(num: number) {
	/*
	 * regex taken from:
	 * https://stackoverflow.com/a/2901298
	 */

	return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
