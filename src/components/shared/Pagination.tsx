import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface IPaginationItem {
	id: number;
	page: number;
	active: boolean;
}

function Pagination({ active, total, setValue }: { active: number, total: number, setValue: React.Dispatch<React.SetStateAction<number>> }) {
	const [ isOpened, setOpened ] = useState(false);
	const [ isPageError, setPageError ] = useState(false);
	const [ pageInput, setPageInput ] = useState(active.toString());

	const refButton = useRef<HTMLButtonElement>(null);
	const refPageDialog = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if(refPageDialog.current && refButton.current && !refButton.current.contains(event.target as Element) && !refPageDialog.current.contains(event.target as Element)) {
				setOpened(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const items: IPaginationItem[] = [];

	for(let i = 0; i < total; i++) {
		items.push({
			id: items.length + 1,
			page: i + 1,
			active: active === i + 1
		});

		if(i === 2 && total > 7) {
			items.push({
				id: items.length + 1,
				page: -1,
				active: (active > 3 && active < total - 3)
			});
			i = total - 4;
		}
	}

	function handlePageInputChange(value: string) {
		const page = _.parseInt(value, 10);

		if(_.isFinite(page)) {
			setPageError(false);
			setPageInput(value);
		}
	}

	function handlePageInputSubmit() {
		const page = _.parseInt(pageInput, 10);

		if(_.isFinite(page) && (page > 0 && page <= total)) {
			setValue(page);
			setOpened(false);
		}
		else {
			setPageError(true);
		}
	}

	function handlePageClick(value: number) {
		if(value === -1) {
			setPageError(false);
			setPageInput(active.toString());
			setOpened(!isOpened);
			return;
		}

		setValue(value);
	}

	function PageItem({ value, label, active, htmlRef }: { value: number, label: number | string, active: boolean, htmlRef?: React.LegacyRef<HTMLButtonElement> }) {
		return (
			<button type="button" onClick={ () => handlePageClick(value) } ref={ htmlRef } className={ `flex justify-center items-center w-8 h-8 font-semibold ${ active ? "bg-light-80 dark:bg-dark-80 text-white dark:text-dark-0" : "hover:bg-light-40 dark:hover:bg-dark-40 text-light-100 dark:text-dark-100" } rounded-lg cursor-pointer` }>{ label }</button>
		);
	}

	return (
		<>
			<div className="flex gap-x-3">
				{
					items.map(item => {
						if(item.page !== -1) {
							return <PageItem key={ item.id } value={ item.page } label={ item.page } active={ item.active } />;
						}
						else {
							return (
								<div key={ item.id }>
									<PageItem value={ item.page } label="..." active={ item.active } htmlRef={ refButton } />
									{
										isOpened &&
										<div className="relative flex justify-center">
											<div className="absolute top-2">
												<div className="flex justify-center gap-x-2 px-3 py-2 bg-light-40 dark:bg-dark-0 rounded-lg" ref={ refPageDialog }>
													<input type="number" min={ 1 } max={ total } value={ pageInput } onChange={ e => handlePageInputChange(e.target.value) } className={ `form-input w-20 px-3 py-1.5 font-medium bg-light-20 dark:bg-dark-40 ring-danger-light dark:ring-danger-dark focus:ring-danger-light dark:focus:ring-danger-dark text-light-100 dark:text-dark-100 caret-light-100 dark:caret-dark-100 border-none ${ isPageError ? "ring-2 focus:ring-2" : "focus:ring-0" } rounded-md` } />
													<button type="button" onClick={ () => handlePageInputSubmit() } className="flex justify-center items-center px-2 font-medium bg-light-20 dark:bg-dark-20 active:bg-light-40 dark:active:bg-dark-40 rounded-lg">
														<FontAwesomeIcon icon={ faCheck } className="text-xl text-light-100 dark:text-dark-100" />
													</button>
												</div>
											</div>
										</div>
									}
								</div>
							);
						}
					})
				}
			</div>
		</>
	);
}

export default Pagination;
