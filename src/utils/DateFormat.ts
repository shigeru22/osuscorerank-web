export function dateToDateString(date: Date, format: number) {
	const dateString = date.getDate().toString();
	const monthString = (date.getMonth() + 1).toString();
	const yearString = date.getFullYear().toString();

	switch(format) {
		case 2: return `${ monthString }/${ dateString }/${ yearString }`;
		case 3: return `${ yearString }/${ monthString }/${ dateString }`;
		default: return `${ dateString }/${ monthString }/${ yearString }`;
	}
}
