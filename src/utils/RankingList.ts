export function getTableRowsFromHeight() {
	const height = window.innerHeight;

	if(height >= 600) {
		return 5 + Math.floor((height - 600) / 34);
	}

	return 5;
}
