import React from "react";

function Checkbox({ name, label, disabled, value, setValue }: { name: string, label: string, disabled?: boolean, value: boolean, setValue: React.Dispatch<React.SetStateAction<boolean>> }) {
	function handleValueChange(value: boolean) {
		setValue(value);
	}

	return (
		<div className="flex items-center gap-x-2">
			<input id={ name } type="checkbox" name={ name } checked={ value } disabled={ disabled } onChange={ () => handleValueChange(!value) } className="form-checkbox w-5 h-5 border-2 focus:ring-0 active:ring-0 dark:ring-0 dark:active:ring-0 outline-none dark:outline-0 border-light-60 dark:border-dark-60 active:border-light-80 dark:focus:border-dark-80 dark:active:border-dark-60 dark:bg-dark-20 dark:active:bg-dark-60 text-light-60 active:focus:text-light-80 focus:ring-white dark:focus:ring-dark-20 rounded" />
			<label htmlFor={ name } className={ `font-medium text-light-100 dark:text-dark-100 ${ disabled ? "opacity-50" : "" }` }>{ label }</label>
		</div>
	);
}

export default Checkbox;
