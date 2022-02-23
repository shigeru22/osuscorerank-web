import React from "react";

function Dialog({ htmlRef, title, children }: { htmlRef?: React.Ref<HTMLDivElement>, title: string, children: JSX.Element | JSX.Element[] }) {
	return (
		<div className="flex justify-center items-center w-full h-full">
			<div ref={ htmlRef } className="flex flex-col min-w-48 w-5/6 m-2 p-6 bg-white dark:bg-dark-0 rounded-lg space-y-4">
				<h3 className="font-semibold text-xl text-light-100 dark:text-dark-100">{ title }</h3>
				<div className="max-h-4.625 space-y-1 overflow-y-auto">
					{ children }
				</div>
			</div>
		</div>
	);
}

export default Dialog;
