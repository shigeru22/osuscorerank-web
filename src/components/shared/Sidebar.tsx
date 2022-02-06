import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas, faListOl, faStar, faSlidersH, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import ReactCountryFlag from "react-country-flag";
import _ from "lodash";
import { ReactComponent as Shigeru } from "../../assets/shigeru.svg";

function Sidebar({ active }: { active: string }) {
	const routes = [ "country", "global", "starred", "settings", "help" ];

	let index = 0;
	if(!_.isEmpty(active)) {
		index = _.findIndex(routes, item => item === active);
	}

	return (
		<div className="w-32 h-screen py-16 bg-light-20">
			<div className="flex flex-col justify-between items-center h-full mx-auto">
				<div className="flex flex-col gap-y-12">
					<ReactCountryFlag countryCode="ID" svg className={ `text-xl ${ index !== 0 && "opacity-40" } rounded-md` } />
					<FontAwesomeIcon icon={ faGlobeAmericas } className={ `text-xl ${ index === 1 ? "text-light-100" : "text-light-40" }` } />
				</div>
				<div className="flex flex-col gap-y-6">
					<div className="flex flex-col items-center gap-y-12">
						<FontAwesomeIcon icon={ faListOl } className={ `text-xl ${ index === 0 || index === 1 ? "text-light-100" : "text-light-40" }` } />
						<FontAwesomeIcon icon={ faStar } className={ `text-xl ${ index === 2 ? "text-light-100" : "text-light-40" }` } />
						<FontAwesomeIcon icon={ faSlidersH } className={ `text-xl ${ index === 3 ? "text-light-100" : "text-light-40" }` } />
						<FontAwesomeIcon icon={ faQuestionCircle } className={ `text-xl ${ index === 4 ? "text-light-100" : "text-light-40" }` } />
					</div>
					<div className="w-16 h-1 border-b-1 border-light-80" />
					<div className="flex flex-col items-center">
						<Shigeru className="w-8 h-8 fill-light-100" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
