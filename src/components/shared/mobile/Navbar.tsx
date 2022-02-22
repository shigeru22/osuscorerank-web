import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import DimBackground from "../inputs/DimBackground";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faGlobeAmericas, faStar, faSlidersH, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

function Navbar({ active }: { active: string }) {
	const [ isOpened, setOpened ] = useState(false);

	const refHamburgerButton = useRef<HTMLButtonElement>(null);
	const refSidebarMenu = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if(refSidebarMenu.current && refHamburgerButton.current && !refHamburgerButton.current.contains(event.target as Element) && !refSidebarMenu.current.contains(event.target as Element)) {
				setOpened(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const routes = [ "Country", "Global", "Starred", "Settings", "Help" ];

	let index = 0;
	if(!_.isEmpty(active)) {
		index = _.findIndex(routes, item => item.toLowerCase() === active);
	}

	function handleMenuClick(menu: number) {
		if(menu !== index) {
			setOpened(false);
		}
	}

	return (
		<div className="fixed top-0 flex justify-between items-center w-full h-16 pl-4 pr-8 bg-white dark:bg-dark-20">
			<div className="flex items-center gap-x-2">
				<button type="button" ref={ refHamburgerButton } onClick={ () => setOpened(true) } className="flex justify-center items-center w-12 h-12">
					<FontAwesomeIcon icon={ faBars } className="text-xl text-light-100 dark:text-dark-100" />
				</button>
				<div className="font-semibold text-2xl text-light-100 dark:text-dark-100">{ routes[index] }</div>
			</div>
			<div className="flex justify-center items-center gap-x-2">
				<ReactCountryFlag countryCode="ID" svg className="text-xl rounded-md" />
				<FontAwesomeIcon icon={ faChevronDown } className="text-light-100 dark:text-dark-100" />
			</div>
			{
				isOpened &&
				<DimBackground>
					<div ref={ refSidebarMenu } className="flex flex-col justify-between max-w-xs w-4/5 h-full p-4 bg-white dark:bg-dark-20">
						<div className="flex flex-col gap-y-2">
							<Link to="/" onClick={ () => handleMenuClick(0) }>
								<div className={ `flex items-center gap-x-4 p-4 ${ index === 0 ? "bg-light-60 dark:bg-dark-60" : "hover:bg-light-40 dark:hover:bg-dark-40" } rounded-lg` }>
									<div className="flex justify-center items-center w-6">
										<ReactCountryFlag countryCode="ID" svg className="text-xl rounded-md" />
									</div>
									<div className={ `font-semibold text-lg ${ index === 0 ? "text-light-20 dark:text-dark-100" : "text-light-100 dark:text-dark-100" }` }>Country</div>
								</div>
							</Link>
							<Link to="/global" onClick={ () => handleMenuClick(1) }>
								<div className={ `flex items-center gap-x-4 p-4 ${ index === 1 ? "bg-light-60 dark:bg-dark-60" : "hover:bg-light-40 dark:hover:bg-dark-40" } rounded-lg` }>
									<div className="flex justify-center items-center w-6">
										<FontAwesomeIcon icon={ faGlobeAmericas } className={ `text-xl ${ index === 1 ? "text-white dark:text-dark-100" : "text-light-100 dark:text-dark-100" }` } />
									</div>
									<div className={ `font-semibold text-lg ${ index === 1 ? "text-light-20 dark:text-dark-100" : "text-light-100 dark:text-dark-100" }` }>Global</div>
								</div>
							</Link>
							<Link to="/starred" onClick={ () => handleMenuClick(2) }>
								<div className={ `flex items-center gap-x-4 p-4 ${ index === 2 ? "bg-light-60 dark:bg-dark-60" : "hover:bg-light-40 dark:hover:bg-dark-40" } rounded-lg` }>
									<div className="flex justify-center items-center w-6">
										<FontAwesomeIcon icon={ faStar } className={ `text-xl ${ index === 2 ? "text-white dark:text-dark-100" : "text-light-100 dark:text-dark-100" }` } />
									</div>
									<div className={ `font-semibold text-lg ${ index === 2 ? "text-light-20 dark:text-dark-100" : "text-light-100 dark:text-dark-100" }` }>Starred</div>
								</div>
							</Link>
							<Link to="/settings" onClick={ () => handleMenuClick(3) }>
								<div className={ `flex items-center gap-x-4 p-4 ${ index === 3 ? "bg-light-60 dark:bg-dark-60" : "hover:bg-light-40 dark:hover:bg-dark-40" } rounded-lg` }>
									<div className="flex justify-center items-center w-6">
										<FontAwesomeIcon icon={ faSlidersH } className={ `text-xl ${ index === 3 ? "text-white dark:text-dark-100" : "text-light-100 dark:text-dark-100" }` } />
									</div>
									<div className={ `font-semibold text-lg ${ index === 3 ? "text-light-20 dark:text-dark-100" : "text-light-100 dark:text-dark-100" }` }>Settings</div>
								</div>
							</Link>
							<Link to="/help" onClick={ () => handleMenuClick(4) }>
								<div className={ `flex items-center gap-x-4 p-4 ${ index === 4 ? "bg-light-60 dark:bg-dark-60" : "hover:bg-light-40 dark:hover:bg-dark-40" } rounded-lg` }>
									<div className="flex justify-center items-center w-6">
										<FontAwesomeIcon icon={ faQuestionCircle } className={ `text-xl ${ index === 4 ? "text-white dark:text-dark-100" : "text-light-100 dark:text-dark-100" }` } />
									</div>
									<div className={ `font-semibold text-lg ${ index === 4 ? "text-light-20 dark:text-dark-100" : "text-light-100 dark:text-dark-100" }` }>Help</div>
								</div>
							</Link>
						</div>
						<div className="font-medium text-center text-light-40 dark:text-dark-40">
							osu-inactive-score 1.0.0
						</div>
					</div>
				</DimBackground>
			}
		</div>
	);
}

export default Navbar;
