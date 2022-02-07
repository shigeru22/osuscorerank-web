import React, { useState } from "react";
import Dropdown from "../../components/shared/inputs/Dropdown";
import { IDropdownData } from "../../types/components/Dropdown";

function Country() {
	const [ selected, setSelected ] = useState(-1);

	const dropdownData: IDropdownData[] = [
		{
			id: 1,
			name: "Score"
		},
		{
			id: 2,
			name: "pp"
		}
	];

	return (
		<div className="p-4">
			<h1>Country page</h1>
			<Dropdown name="sort" label="Sort" data={ dropdownData } value={ selected } setValue={ setSelected } />
		</div>
	);
}

export default Country;
