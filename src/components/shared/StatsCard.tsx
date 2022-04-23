import React from "react";
import _ from "lodash";

function StatsCard({ title, data, subtitle }: { title: string, data: string, subtitle?: string }) {
	return (
		<div className="group w-max px-6 py-4 space-y-0.5 bg-light-20 hover:bg-light-40 dark:bg-dark-0 dark:hover:bg-dark-40 rounded-lg cursor-default">
			<h3 className="inline-block min-w-28 font-medium text-light-80 group-hover:text-light-100 dark:text-dark-80 dark:group-hover:text-dark-100 whitespace-nowrap">{ title }</h3>
			<div className="text-2xl font-semibold text-light-100 dark:text-dark-100">{ data }</div>
			{
				!_.isUndefined(subtitle) &&
				<p className="inline-block min-w-28 text-xs font-semibold text-light-80 group-hover:text-light-100 dark:text-dark-60 dark:group-hover:text-dark-80 whitespace-nowrap">{ subtitle }</p>
			}
		</div>
	);
}

export default StatsCard;
