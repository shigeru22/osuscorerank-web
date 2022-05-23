import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import findIndex from "lodash/findIndex";
import ReactCountryFlag from "react-country-flag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas, faListOl, faStar, faSlidersH, faQuestionCircle, faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { settingsContext } from "../../views/App";
import { ICountryData } from "../../types/data/Country";
import { ReactComponent as LogoIcon } from "../../assets/logo.svg";

function Sidebar({ active, countries }: { active: string, countries: ICountryData[] }) {
	const { activeCountryId, setActiveCountryId } = useContext(settingsContext);

	const [ isCountrySelectorOpened, setCountrySelectorOpened ] = useState(false);

	const refCountryButton = useRef<HTMLButtonElement>(null);
	const refCountryMenu = useRef<HTMLDivElement>(null);

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

	const routes = [ "country", "global", "starred", "settings", "help" ];

	let index = 0;
	if(!isEmpty(active)) {
		index = findIndex(routes, item => item === active);
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
		<div className="w-32 min-w-32 h-screen py-16 bg-light-20 dark:bg-dark-40">
			<div className="flex flex-col justify-between items-center gap-y-12 h-full mx-auto">
				<div className="flex flex-col gap-y-10">
					<div className="flex items-center">
						<div className="relative">
							<Link to="/" className="group p-2">
								<ReactCountryFlag countryCode={ getCountryCodeById(activeCountryId) } svg className={ `text-xl ${ index !== 0 && "opacity-40 group-hover:opacity-60" } rounded-md` } />
							</Link>
							<button type="button" ref={ refCountryButton } onClick={ () => setCountrySelectorOpened(true) } className="absolute top-0.5 left-12">
								<FontAwesomeIcon icon={ faChevronRight } className={ `text-xl ${ isCountrySelectorOpened ? "text-light-80 dark:text-dark-80" : "text-light-40 dark:text-dark-60 hover:text-light-60 dark:hover:text-dark-80" }` } />
							</button>
							{
								isCountrySelectorOpened &&
								<div ref={ refCountryMenu } className="absolute top-0 left-20 w-max m-2 p-3 bg-light-20 dark:bg-dark-0 rounded-lg">
									<div className={ `flex flex-col gap-y-1 max-h-44 ${ countries.length > 0 && "overflow-y-scroll" }` }>
										{
											countries.length > 0 ?
												countries.map(item => (
													<div key={ item.id } onClick={ () => handleCountryChange(item.id) } className={ `flex items-center gap-x-2 min-w-48 px-2 py-1 ${ item.id === activeCountryId ? "bg-light-60 dark:bg-dark-40 text-white dark:text-dark-40" : "hover:bg-light-40 dark:hover:bg-dark-20 text-light-100 dark:text-dark-100" } rounded-lg cursor-pointer` }>
														<ReactCountryFlag countryCode={ item.code } svg className="text-xl rounded-md" />
														<div className={ `font-medium ${ item.id === activeCountryId ? "text-white" : "text-light-100" } dark:text-dark-100 whitespace-pre` }>{ item.name }</div>
													</div>
												))
												:
												<div className="flex flex-col justify-center items-center w-42 h-42 px-2 py-1">
													<FontAwesomeIcon icon={ faTimes } className="text-5xl text-light-60 dark:text-dark-80" />
													<div className="font-medium text-center text-light-60 dark:text-dark-80">Failed to retrieve country list.</div>
												</div>
										}
									</div>
								</div>
							}
						</div>
					</div>
					<Link to="/global" className="group p-2">
						<FontAwesomeIcon icon={ faGlobeAmericas } className={ `text-xl ${ index === 1 ? "text-light-100 dark:text-dark-100" : "text-light-40 dark:text-dark-60 hover:text-light-60 dark:hover:text-dark-80" }` } />
					</Link>
				</div>
				<div className="flex flex-col gap-y-6">
					<div className="flex flex-col items-center gap-y-8">
						<Link to="/" className="group p-2">
							<FontAwesomeIcon icon={ faListOl } className={ `text-xl ${ index === 0 || index === 1 ? "text-light-100 dark:text-dark-100" : "text-light-40 dark:text-dark-60 group-hover:text-light-60 dark:group-hover:text-dark-80" }` } />
						</Link>
						<Link to="/starred" className="group p-2">
							<FontAwesomeIcon icon={ faStar } className={ `text-xl ${ index === 2 ? "text-light-100 dark:text-dark-100" : "text-light-40 dark:text-dark-60 group-hover:text-light-60 dark:group-hover:text-dark-80" }` } />
						</Link>
						<Link to="/settings" className="group p-2">
							<FontAwesomeIcon icon={ faSlidersH } className={ `text-xl ${ index === 3 ? "text-light-100 dark:text-dark-100" : "text-light-40 dark:text-dark-60 group-hover:text-light-60 dark:group-hover:text-dark-80" }` } />
						</Link>
						<Link to="/help" className="group p-2">
							<FontAwesomeIcon icon={ faQuestionCircle } className={ `text-xl ${ index === 4 ? "text-light-100 dark:text-dark-100" : "text-light-40 dark:text-dark-60 group-hover:text-light-60 dark:group-hover:text-dark-80" }` } />
						</Link>
					</div>
					<div className="w-16 h-1 border-b-1 border-light-80" />
					<div className="flex flex-col items-center">
						<LogoIcon className="w-8 h-8 fill-light-100 dark:fill-dark-100" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
