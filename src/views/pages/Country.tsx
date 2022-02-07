import React from "react";
import StatsCard from "../../components/shared/StatsCard";

function Country() {
	return (
		<div className="p-4">
			<h1>Country page</h1>
			<div className="flex items-start gap-x-4">
				<StatsCard title="Statistics Title" data="5" subtitle="+ 1 since last month" />
				<StatsCard title="Statistics Title" data="5" />
			</div>
		</div>
	);
}

export default Country;
