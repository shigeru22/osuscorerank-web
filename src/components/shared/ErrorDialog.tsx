import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { ILogData } from "../../types/Log";
import { LogType } from "../../utils/Logging";

function ErrorDialog({ htmlRef, data, onCancelClick }: { htmlRef?: React.Ref<HTMLDivElement>, data: ILogData[], onCancelClick: () => void }) {
	const [ isExpanded, setExpanded ] = useState(false);

	function toggleLogExpansion() {
		const temp = !isExpanded;
		setExpanded(temp);
	}

	function LogElement({ log }: { log: ILogData }) {
		const logName = [ "DEBUG", "INFO", "WARN", "ERROR" ];

		return (
			<p className="font-mono font-medium text-sm text-debug-light dark:text-debug-dark">
				[{ log.time.toLocaleString() }]&nbsp;
				<span className={
					log.name === LogType.ERROR
						? "text-danger-light" :
						log.name === LogType.WARN
							? "text-warn-light dark:text-warn-dark" :
							log.name === LogType.INFO ? "text-black dark:text-white" : ""
				}>
					{ logName[log.name] }: { log.description }
				</span>
			</p>
		);
	}

	return (
		<div className="flex justify-center items-center w-full h-full z-20">
			<div ref={ htmlRef } className="flex flex-col gap-y-4 min-w-48 md:min-w-56 max-w-md md:max-w-xl w-5/6 m-2 p-6 bg-white dark:bg-dark-0 rounded-lg">
				<h3 className="font-semibold text-xl text-light-100 dark:text-dark-100">Error Details</h3>
				<div className="max-h-80 space-y-2 overflow-y-auto">
					<p className="font-medium text-light-80 dark:text-dark-80">
						These logs might be helpful for troubleshooting. If the problem persists, feel free to file an issue along with these logs.
					</p>
					<div className="flex flex-col w-full">
						<button type="button" onClick={ () => toggleLogExpansion() } className="flex justify-between items-center w-full px-3 py-1.5 bg-light-40 dark:bg-dark-40 rounded-lg">
							<p className="font-medium text-light-100 dark:text-dark-100">Logs</p>
							<FontAwesomeIcon icon={ !isExpanded ? faChevronDown : faChevronUp } className="text-light-80 dark:text-dark-80" />
						</button>
						{
							isExpanded &&
							<div className="flex flex-col max-h-26 md:max-h-36 px-3 py-1.5 bg-light-20 dark:bg-dark-20 overflow-y-auto rounded-lg">
								{
									data.map(item => (
										<LogElement key={ item.id } log={ item } />
									))
								}
							</div>
						}
					</div>
					<p className="font-medium text-sm text-light-60 dark:text-dark-60">
						Note: These logs are only stored on your device and never leave your browser.
					</p>
				</div>
				<div className="flex justify-end gap-x-2">
					<button type="button" onClick={ () => onCancelClick() } className="px-3 py-1 font-medium active:bg-light-40 dark:active:bg-dark-60 text-light-80 dark:text-dark-80 rounded-lg">Cancel</button>
				</div>
			</div>
		</div>
	);
}

export default ErrorDialog;
