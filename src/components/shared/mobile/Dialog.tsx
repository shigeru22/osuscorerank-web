import _ from "lodash";
import React from "react";

function Dialog({ htmlRef, title, children, onOkayClick, onCancelClick }: { htmlRef?: React.Ref<HTMLDivElement>, title: string, children: JSX.Element | JSX.Element[], onOkayClick?: () => void, onCancelClick: () => void }) {
	return (
		<div className="flex justify-center items-center w-full h-full z-20">
			<div ref={ htmlRef } className="flex flex-col gap-y-4 min-w-48 max-w-md w-5/6 m-2 p-6 bg-white dark:bg-dark-0 rounded-lg">
				<h3 className="font-semibold text-xl text-light-100 dark:text-dark-100">{ title }</h3>
				<div className="max-h-4.625 space-y-1 overflow-y-auto">
					{ children }
				</div>
				<div className="flex justify-end gap-x-2">
					{
						!_.isUndefined(onOkayClick) &&
						<button type="button" onClick={ () => onOkayClick() } className="px-3 py-1 font-medium active:bg-light-40 dark:active:bg-dark-60 text-light-80 dark:text-dark-80 rounded-lg">OK</button>
					}
					<button type="button" onClick={ () => onCancelClick() } className="px-3 py-1 font-medium active:bg-light-40 dark:active:bg-dark-60 text-light-80 dark:text-dark-80 rounded-lg">Cancel</button>
				</div>
			</div>
		</div>
	);
}

export default Dialog;
