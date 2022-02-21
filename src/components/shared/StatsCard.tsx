import React from "react";
import _ from "lodash";

function StatsCard({ title, data, subtitle }: { title: string, data: string, subtitle?: string }) {
	return (
		<div className="px-6 py-4 space-y-0.5 bg-light-20 dark:bg-dark-0 rounded-lg">
			<h3 className="block font-medium text-light-80 dark:text-dark-80 whitespace-nowrap">{ title }</h3>
			<div className="text-2xl font-semibold text-light-100 dark:text-dark-100">{ data }</div>
			{
				!_.isUndefined(subtitle) &&
				<p className="text-xs font-semibold text-light-80 dark:text-dark-60 whitespace-nowrap">{ subtitle }</p>
			}
		</div>
	);
}

export default StatsCard;
