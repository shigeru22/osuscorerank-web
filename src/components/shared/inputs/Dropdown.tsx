import React, { useState, useRef, useEffect } from "react";
import isUndefined from "lodash/isUndefined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import DimBackground from "../DimBackground";
import Dialog from "../mobile/Dialog";
import { IDropdownData } from "../../../types/components/Dropdown";

function Dropdown({ name, label, data, disabled, value, setValue }: { name: string, label: string, data: IDropdownData[], disabled?: boolean, value: number, setValue?: React.Dispatch<React.SetStateAction<number>> }) {
	const [ isOpened, setOpened ] = useState(false);

	const refButton = useRef<HTMLButtonElement>(null);
	const refDropdown = useRef<HTMLDivElement>(null);
	const refMobileDropdown = useRef<HTMLDivElement>(null);

	function enableScrolling() {
		const body = document.body;

		body.classList.remove("overflow-hidden");
		body.classList.remove("md:overflow-auto");
		body.classList.length <= 0 && body.removeAttribute("class");
	}

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if(
				refButton.current &&
				!refButton.current.contains(event.target as Element) &&
				!(
					(refDropdown.current && refDropdown.current.contains(event.target as Element)) ||
					(refMobileDropdown.current && refMobileDropdown.current.contains(event.target as Element))
				)) {
				setOpened(false);
				enableScrolling();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		function handleResizeWindow() {
			setOpened(false);
			enableScrolling();
		}

		window.addEventListener("resize", handleResizeWindow);

		return () => {
			window.addEventListener("resize", handleResizeWindow);
		};
	});

	function toggleDropdown() {
		if(isUndefined(disabled) || !disabled) {
			if(!isOpened) {
				document.body.classList.add("overflow-hidden");
				document.body.classList.add("md:overflow-auto");
			}
			else {
				enableScrolling();
			}

			setOpened(!isOpened);
		}
	}

	function handleValueChange(value: number) {
		if(!isUndefined(setValue)) {
			setValue(value);
		}

		setOpened(false);
	}

	function getValueFromData(value?: number) {
		if(!isUndefined(value)) {
			const len = data.length;
			for(let i = 0; i < len; i++) {
				if(data[i].id === value) {
					return data[i].name;
				}
			}
		}

		return "";
	}

	return (
		<div className="flex md:block justify-between items-center md:w-56 gap-x-4 md:space-y-2">
			<div>
				<label htmlFor={ name } className="font-medium text-light-80 dark:text-dark-80 whitespace-nowrap">{ label }</label>
			</div>
			<div className="flex flex-col justify-end">
				<button type="button" id={ name } onClick={ () => toggleDropdown() } ref={ refButton } className={ `flex flex-row justify-between items-center group max-w-full md:w-full px-3 py-1.5 ${ isOpened ? "bg-light-40 dark:bg-dark-60" : "bg-light-20 dark:bg-dark-40" } rounded-lg ${ disabled ? "opacity-50" : "" }` }>
					<div className="md:min-w-24 font-medium text-left text-light-100 dark:text-dark-100 whitespace-nowrap overflow-ellipsis">{ getValueFromData(value) }</div>
					<FontAwesomeIcon icon={ faChevronDown } className={ `text-2xl pl-3 ${ isOpened ? "text-light-80 dark:text-dark-100" : "text-light-60 dark:text-dark-80 group-hover:text-light-80 dark:group-hover:text-dark-100" }` } />
				</button>
				{
					isOpened &&
					<>
						<div className="lg:hidden">
							<DimBackground>
								<Dialog htmlRef={ refMobileDropdown } title={ label } onCancelClick={ () => setOpened(false) }>
									{
										data.map(item => (
											<div key={ item.id } onClick={ () => handleValueChange(item.id) } className={ `px-4 py-4 font-medium ${ item.id === value ? "bg-light-60 dark:bg-dark-40 text-white dark:text-dark-100" : "hover:bg-light-40 dark:hover:bg-dark-20 text-light-100 dark:text-dark-100" } rounded-lg cursor-pointer` }>{ item.name }</div>
										))
									}
								</Dialog>
							</DimBackground>
						</div>
						<div className="relative hidden lg:flex justify-center z-10">
							<div className="absolute flex flex-col w-full m-2 p-3 bg-light-20 dark:bg-dark-0 rounded-lg">
								<div ref={ refDropdown } className="max-h-26 space-y-1 overflow-y-auto">
									{
										data.map(item => (
											<div key={ item.id } onClick={ () => handleValueChange(item.id) } className={ `px-2 py-1 font-medium ${ item.id === value ? "bg-light-60 dark:bg-dark-40 text-white dark:text-dark-100" : "hover:bg-light-40 dark:hover:bg-dark-20 text-light-100 dark:text-dark-100" } rounded-lg cursor-pointer` }>{ item.name }</div>
										))
									}
								</div>
							</div>
						</div>
					</>
				}
			</div>
		</div>
	);
}

export default Dropdown;
