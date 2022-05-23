import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import isNull from "lodash/isNull";
import findIndex from "lodash/findIndex";
import ReactCountryFlag from "react-country-flag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faGlobeAmericas, faStar, faSlidersH, faQuestionCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import DimBackground from "../DimBackground";
import Dialog from "./Dialog";
import { ICountryData } from "../../../types/data/Country";
import { settingsContext } from "../../../views/App";
import { ReactComponent as LogoIcon } from "../../../assets/logo.svg";

function Navbar({ active, countries }: { active: string, countries: ICountryData[] }) {
	const { updateData, activeCountryId, setActiveCountryId } = useContext(settingsContext);

	const [ isOpened, setOpened ] = useState(false);
	const [ isCountrySelectorOpened, setCountrySelectorOpened ] = useState(false);

	const refHamburgerButton = useRef<HTMLButtonElement>(null);
	const refSidebarMenu = useRef<HTMLDivElement>(null);

	const refCountryButton = useRef<HTMLButtonElement>(null);
	const refCountryMenu = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if(refCountryMenu.current && refCountryButton.current && !refCountryButton.current.contains(event.target as Element) && !refCountryMenu.current.contains(event.target as Element)) {
				setCountrySelectorOpened(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	const routes = [ "Country", "Global", "Starred", "Settings", "Help" ];

	let index = 0;
	if(!isEmpty(active)) {
		index = findIndex(routes, item => item.toLowerCase() === active);
	}

	function handleMenuClick(menu: number) {
		if(menu !== index) {
			setOpened(false);
		}
	}

	function handleCountryChange(id: number) {
		setActiveCountryId(id);
		setCountrySelectorOpened(false);
	}

	function getCountryCodeById(id: number) {
		const index = findIndex(countries, country => country.id === id);

		if(index >= 0) {
			return countries[index].code;
		}
		else {
			return "";
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
			<button type="button" ref={ refCountryButton } onClick={ () => setCountrySelectorOpened(true) } className={ `${ index === 0 ? "flex" : "hidden" } justify-center items-center gap-x-2` }>
				<ReactCountryFlag countryCode={ getCountryCodeById(activeCountryId) } svg className="text-xl rounded-md" />
				<FontAwesomeIcon icon={ faChevronDown } className="text-light-100 dark:text-dark-100" />
			</button>
			{
				isOpened &&
				<DimBackground>
					<div ref={ refSidebarMenu } className="flex flex-col max-w-xs w-4/5 h-full bg-white dark:bg-dark-20">
						<div className="flex flex-col justify-end gap-y-2 p-4 bg-light-20 dark:bg-dark-40 overflow-clip">
							<LogoIcon className="w-16 h-16 mt-8 fill-light-100 dark:fill-dark-100" />
							<div className="flex flex-col">
								<h2 className="font-medium text-light-60 dark:text-dark-80">osu! Scores Rank</h2>
								<h4 className="font-medium text-light-40 dark:text-dark-60">{ !isNull(updateData) ? updateData.webVersion : "v?.?.?" }</h4>
							</div>
							<div className="relative bottom-0 right-0">
								<div className="absolute -bottom-24 -right-16">
									<LogoIcon className="w-64 h-64 mt-8 fill-light-100 dark:fill-dark-100 opacity-10" />
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-y-2 p-4">
							<Link to="/" onClick={ () => handleMenuClick(0) }>
								<div className={ `flex items-center gap-x-4 p-4 ${ index === 0 ? "bg-light-60 dark:bg-dark-60" : "hover:bg-light-40 dark:hover:bg-dark-40" } rounded-lg` }>
									<div className="flex justify-center items-center w-6">
										<ReactCountryFlag countryCode={ getCountryCodeById(activeCountryId) } svg className="text-xl rounded-md" />
									</div>
									<div className={ `font-semibold text-lg ${ index === 0 ? "text-light-20" : "text-light-100" } dark:text-dark-100` }>Country</div>
								</div>
							</Link>
							<Link to="/global" onClick={ () => handleMenuClick(1) }>
								<div className={ `flex items-center gap-x-4 p-4 ${ index === 1 ? "bg-light-60 dark:bg-dark-60" : "hover:bg-light-40 dark:hover:bg-dark-40" } rounded-lg` }>
									<div className="flex justify-center items-center w-6">
										<FontAwesomeIcon icon={ faGlobeAmericas } className={ `text-xl ${ index === 1 ? "text-white" : "text-light-100" } dark:text-dark-100` } />
									</div>
									<div className={ `font-semibold text-lg ${ index === 1 ? "text-light-20" : "text-light-100" } dark:text-dark-100` }>Global</div>
								</div>
							</Link>
							<Link to="/starred" onClick={ () => handleMenuClick(2) }>
								<div className={ `flex items-center gap-x-4 p-4 ${ index === 2 ? "bg-light-60 dark:bg-dark-60" : "hover:bg-light-40 dark:hover:bg-dark-40" } rounded-lg` }>
									<div className="flex justify-center items-center w-6">
										<FontAwesomeIcon icon={ faStar } className={ `text-xl ${ index === 2 ? "text-white" : "text-light-100" } dark:text-dark-100` } />
									</div>
									<div className={ `font-semibold text-lg ${ index === 2 ? "text-light-20" : "text-light-100" } dark:text-dark-100` }>Starred</div>
								</div>
							</Link>
							<Link to="/settings" onClick={ () => handleMenuClick(3) }>
								<div className={ `flex items-center gap-x-4 p-4 ${ index === 3 ? "bg-light-60 dark:bg-dark-60" : "hover:bg-light-40 dark:hover:bg-dark-40" } rounded-lg` }>
									<div className="flex justify-center items-center w-6">
										<FontAwesomeIcon icon={ faSlidersH } className={ `text-xl ${ index === 3 ? "text-white" : "text-light-100" } dark:text-dark-100` } />
									</div>
									<div className={ `font-semibold text-lg ${ index === 3 ? "text-light-20" : "text-light-100" } dark:text-dark-100` }>Settings</div>
								</div>
							</Link>
							<Link to="/help" onClick={ () => handleMenuClick(4) }>
								<div className={ `flex items-center gap-x-4 p-4 ${ index === 4 ? "bg-light-60 dark:bg-dark-60" : "hover:bg-light-40 dark:hover:bg-dark-40" } rounded-lg` }>
									<div className="flex justify-center items-center w-6">
										<FontAwesomeIcon icon={ faQuestionCircle } className={ `text-xl ${ index === 4 ? "text-white" : "text-light-100" } dark:text-dark-100` } />
									</div>
									<div className={ `font-semibold text-lg ${ index === 4 ? "text-light-20" : "text-light-100" } dark:text-dark-100` }>Help</div>
								</div>
							</Link>
						</div>
					</div>
				</DimBackground>
			}
			{
				isCountrySelectorOpened &&
				<DimBackground>
					<Dialog htmlRef={ refCountryMenu } title="Country" onCancelClick={ () => setCountrySelectorOpened(false) }>
						{
							countries.length > 0 ?
								countries.map(item => (
									<div key={ item.id } onClick={ () => handleCountryChange(item.id) } className={ `flex items-center gap-x-4 px-4 py-4 ${ item.id === activeCountryId ? "bg-light-60 dark:bg-dark-40 text-white dark:text-dark-40" : "hover:bg-light-40 dark:hover:bg-dark-20 text-light-100 dark:text-dark-100" } rounded-lg cursor-pointer` }>
										<ReactCountryFlag countryCode={ item.code } svg className="text-xl rounded-md" />
										<div className={ `font-medium ${ item.id === activeCountryId ? "text-white" : "text-light-100" } dark:text-dark-100` }>{ item.name }</div>
									</div>
								))
								:
								<div className="flex flex-col justify-center items-center w-full">
									<FontAwesomeIcon icon={ faTimes } className="text-5xl text-light-60 dark:text-dark-80" />
									<div className="font-medium text-center text-light-60 dark:text-dark-80">Failed to retrieve country list.</div>
								</div>
						}
					</Dialog>
				</DimBackground>
			}
		</div>
	);
}

export default Navbar;
