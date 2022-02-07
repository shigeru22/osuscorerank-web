import React from "react";

function Checkbox({ name, label, value, setValue }: { name: string, label: string, value: boolean, setValue: React.Dispatch<React.SetStateAction<boolean>> }) {
	function handleValueChange(value: boolean) {
		setValue(value);
	}

	return (
		<div className="flex items-center gap-x-2">
			<input id={ name } type="checkbox" name={ name } checked={ value } onChange={ () => handleValueChange(!value) } className="form-checkbox w-5 h-5 border-2 focus:ring-0 border-light-60 focus:border-light-80 text-light-60 active:focus:text-light-80 focus:ring-white rounded" />
			<label htmlFor={ name } className="font-medium">{ label }</label>
		</div>
	);
}

export default Checkbox;
