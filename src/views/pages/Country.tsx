import React, { useState } from "react";
import Pagination from "../../components/shared/Pagination";

function Country() {
	const [ activePage, setActivePage ] = useState(1);

	return (
		<div className="p-4">
			<h1>Country page</h1>
			<Pagination active={ activePage } total={ 10 } setValue={ setActivePage } />
		</div>
	);
}

export default Country;
