import React from "react";
import _ from "lodash";

function Button({ label, type, onClick }: { label: string, type?: "primary" | "danger", onClick?: React.MouseEventHandler<HTMLButtonElement> }) {
	return (
		<button type="button" onClick={ onClick } className={ `w-48 py-1.5 font-medium ${ (!_.isUndefined(type) && type === "danger") ? "bg-danger-light active:bg-danger-light-active text-white" : "bg-light-20 active:bg-light-40" } rounded-lg` }>
			{ label }
		</button>
	);
}

export default Button;
