import React from "react";

function DimBackground({ children }: { children?: JSX.Element | JSX.Element[] }) {
	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 dark:bg-opacity-80 z-10">
			<div className="relative top-0 left-0 w-full h-full">
				{ children }
			</div>
		</div>
	);
}

export default DimBackground;
