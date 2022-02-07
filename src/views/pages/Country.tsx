import React, { useState } from "react";
import Button from "../../components/shared/inputs/Button";

function Country() {
	function logToConsole(value: string) {
		console.log(value);
	}

	function logErrorToConsole(value: string) {
		console.error(value);
	}

	return (
		<div className="p-4">
			<h1>Country page</h1>
			<div className="flex flex-col gap-y-2">
				<Button label="Button" onClick={ () => logToConsole("Hello") } />
				<Button type="primary" label="Button" onClick={ () => logToConsole("It's me") } />
				<Button type="danger" label="Button" onClick={ () => logErrorToConsole("Pippi! Get that cookie out of your mouth - it could be dirty...") } />
			</div>
		</div>
	);
}

export default Country;
