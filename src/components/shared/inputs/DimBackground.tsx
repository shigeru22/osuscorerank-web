import React from "react";

function DimBackground({ children }: { children?: JSX.Element }) {
	return (
		<div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-10">
			{ children }
		</div>
	);
}

export default DimBackground;
