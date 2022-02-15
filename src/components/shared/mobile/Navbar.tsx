import React from "react";
import _ from "lodash";
import ReactCountryFlag from "react-country-flag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Navbar({ active }: { active: string }) {
	const routes = [ "Country", "Global", "Starred", "Settings", "Help" ];

	let index = 0;
	if(!_.isEmpty(active)) {
		index = _.findIndex(routes, item => item.toLowerCase() === active);
	}

	return (
		<div className="flex justify-between items-center w-full h-16 pl-4 pr-8">
			<div className="flex items-center gap-x-2">
				<div className="flex justify-center items-center w-12 h-12">
					<FontAwesomeIcon icon={ faBars } className="text-xl text-light-100" />
				</div>
				<div className="font-semibold text-2xl text-light-100">{ routes[index] }</div>
			</div>
			<div className="flex justify-center items-center gap-x-2">
				<ReactCountryFlag countryCode="ID" svg className="text-xl rounded-md" />
				<FontAwesomeIcon icon={ faChevronDown } className="text-light-100" />
			</div>
		</div>
	);
}

export default Navbar;
