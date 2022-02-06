import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TextInput from "../../components/shared/inputs/Text";

function Country() {
	const [ testInput, setTestInput ] = useState("");

	return (
		<div className="p-4">
			<h1>Country page</h1>
			<TextInput name="test" label="Test" icon={ faSearch } value={ testInput } callback={ setTestInput } />
		</div>
	);
}

export default Country;
