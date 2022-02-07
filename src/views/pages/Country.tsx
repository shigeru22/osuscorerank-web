import React, { useState } from "react";
import Checkbox from "../../components/shared/inputs/Checkbox";

function Country() {
	const [ isChecked, setChecked ] = useState(false);

	return (
		<div className="p-4">
			<h1>Country page</h1>
			<Checkbox name="test" label="Item 1" value={ isChecked } setValue={ setChecked } />
		</div>
	);
}

export default Country;
