import React from "react";
import isUndefined from "lodash/isUndefined";

function Button({ label, type, disabled, onClick }: { label: string, type?: "primary" | "danger", disabled?: boolean, onClick?: React.MouseEventHandler<HTMLButtonElement> }) {
	return (
		<button type="button" onClick={ onClick } className={ `w-48 py-1.5 font-medium ${ (!isUndefined(type) && type === "danger") ? "bg-danger-light active:bg-danger-light-active dark:bg-danger-dark dark:active:bg-danger-dark-active text-white" : "bg-light-20 dark:bg-dark-0 active:bg-light-40 dark:active:bg-dark-40 text-light-100 dark:text-dark-100" } rounded-lg ${ disabled ? "opacity-50" : "" }` }>
			{ label }
		</button>
	);
}

export default Button;
