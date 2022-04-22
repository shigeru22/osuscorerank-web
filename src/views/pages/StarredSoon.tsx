import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

function StarredSoon() {
	return (
		<div className="flex flex-col h-third lg:h-screen px-0 py-0 md:px-14 md:py-12">
			<div className="hidden lg:block">
				<div className="flex justify-between items-start">
					<h1 className="font-semibold text-3xl text-light-100 dark:text-dark-100">Starred</h1>
				</div>
			</div>
			<div className="flex-grow flex justify-center items-center w-full">
				<div className="flex flex-col items-center gap-y-4">
					<FontAwesomeIcon icon={ faInfo } className="text-5xl text-light-60 dark:text-dark-80" />
					<h3 className="font-medium text-center text-light-60 dark:text-dark-80">Coming soon, I promise!</h3>
				</div>
			</div>
		</div>
	);
}

export default StarredSoon;
