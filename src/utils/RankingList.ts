export function getTableRowsFromViewport() {
	const width = window.innerWidth;
	const height = window.innerHeight;

	const baseRow = width >= 1536 ? 9 : 5;

	if(height >= 600) {
		return baseRow + Math.floor((height - 600) / 34);
	}

	return baseRow;
}
