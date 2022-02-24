import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import DimBackground from "../DimBackground";
import Dialog from "./Dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchButton({ value, setValue }: { value: string; setValue?: React.Dispatch<React.SetStateAction<string>> }) {
	const [ isOpened, setOpened ] = useState(false);
	const [ searchQuery, setSearchQuery ] = useState(value);

	const refButton = useRef<HTMLButtonElement>(null);
	const refSearchDialog = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if(refSearchDialog.current && refButton.current && !refButton.current.contains(event.target as Element) && !refSearchDialog.current.contains(event.target as Element)) {
				setOpened(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		function handleResizeWindow() {
			if(window.innerWidth >= 768) closeDialog();
		}

		window.addEventListener("resize", handleResizeWindow);

		return () => {
			window.removeEventListener("resize", handleResizeWindow);
		};
	});

	function closeDialog() {
		setOpened(false);
		setSearchQuery("");
	}

	function openDialog() {
		setOpened(true);
		setSearchQuery(value);
	}

	function handleTextChange(value: string) {
		setSearchQuery(value);
	}

	function handleSearch(value: string) {
		if(!_.isUndefined(setValue)) {
			setValue(value);
		}

		closeDialog();
	}

	return (
		<>
			<button type="button" ref={ refButton } onClick={ () => openDialog() } className="flex justify-center items-center group w-8 h-8 active:bg-light-40 dark:active:bg-dark-80 rounded-lg">
				<FontAwesomeIcon icon={ faSearch } className={ `${ !_.isEmpty(value) ? "text-light-80 dark:text-dark-80" : "text-light-40 dark:text-dark-60" } group-active:text-light-20` } />
			</button>
			{
				isOpened &&
				<DimBackground>
					<Dialog htmlRef={ refSearchDialog } title="Search" onOkayClick={ () => handleSearch(searchQuery) } onCancelClick={ () => setOpened(false) }>
						<div className="flex group">
							<label htmlFor="search">
								<div className="py-1.5 pl-3 bg-light-20 dark:bg-dark-40 rounded-l-md">
									<FontAwesomeIcon icon={ faSearch } className={ `my-auto ${ !_.isEmpty(searchQuery) ? "text-light-80 dark:text-dark-80" : "text-light-40 dark:text-dark-60 group-hover:text-light-80 dark:group-hover:text-dark-80" }` } />
								</div>
							</label>
							<div className="flex-grow">
								<input type="text" id="search" name="search" value={ searchQuery } onChange={ e => handleTextChange(e.target.value) } className="form-input w-full py-1.5 pl-2 pr-3 font-medium bg-light-20 dark:bg-dark-40	 text-light-100 dark:text-dark-100 caret-light-100 dark:caret-dark-100 border-none focus:ring-0 rounded-r-md" />
							</div>
						</div>
					</Dialog>
				</DimBackground>
			}
		</>
	);
}

export default SearchButton;
