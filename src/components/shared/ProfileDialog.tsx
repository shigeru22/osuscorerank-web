import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactCountryFlag from "react-country-flag";
import Button from "./inputs/Button";
import { faTimes, faCircleNotch, faStar } from "@fortawesome/free-solid-svg-icons";
import { numberToSeparatedThousandsString } from "../../utils/Number";

function ProfileDialog({ htmlRef, userId, starred, onCloseClick, onStarClick }: { htmlRef?: React.Ref<HTMLDivElement>, userId: number, starred: boolean, onCloseClick: () => void, onStarClick: () => void }) {
	const [ isFetched, setFetched ] = useState(false); // height = 420 - 48px for fetching

	const [ userName, setUserName ] = useState("");
	const [ countryName, setCountryName ] = useState("");
	const [ countryCode, setCountryCode ] = useState("");

	const [ score, setScore ] = useState(0);
	const [ performancePoints, setPerformancePoints ] = useState(0);

	const [ countryScoreRank, setCountryScoreRank ] = useState(0);
	const [ globalScoreRank, setGlobalScoreRank ] = useState(0);
	const [ countryPerformanceRank, setCountryPerformanceRank ] = useState(0);
	const [ globalPerformanceRank, setGlobalPerformanceRank ] = useState(0);

	useEffect(() => {
		console.log(`User ID: ${ userId }`);

		setTimeout(() => {
			setUserName("User 1");
			setCountryName("Indonesia");
			setCountryCode("ID");

			setScore(183259761552);
			setPerformancePoints(5241);

			setCountryScoreRank(1);
			setGlobalScoreRank(129);
			setCountryPerformanceRank(1);
			setGlobalPerformanceRank(15242);

			setFetched(true);
		}, 1000);
	}, [ userId ]);

	function handleStarClick() {
		onStarClick();
	}

	return (
		<div className="flex h-full justify-center items-center">
			<div ref={ htmlRef } className="max-w-sm lg:max-w-xl min-h-14 max-h-150 w-4/5 bg-white dark:bg-dark-20 rounded-lg overflow-y-auto">
				<div className="relative top-0 hidden lg:block w-full">
					<button type="button" className="absolute top-5 right-5">
						<FontAwesomeIcon icon={ faTimes } className="text-xl text-light-40 dark:text-dark-40 hover:text-light-60 dark:hover:text-light-60" />
					</button>
				</div>
				<div className="w-full p-6 lg:px-12 lg:py-10 space-y-4">
					{
						isFetched ?
							<div className="flex flex-col lg:flex-row items-center gap-4">
								<div className="flex flex-col items-center gap-y-2">
									<div className="w-28 h-28 bg-light-40 dark:bg-dark-40 rounded-3xl">
										<div className="relative h-full">
											<button type="button" onClick={ () => handleStarClick() } className="absolute bottom-2 right-2">
												<FontAwesomeIcon icon={ faStar } className={ `text-xl ${ starred ? "text-light-80 dark:text-dark-80" : "text-white hover:text-light-40 dark:text-dark-20 dark:hover:text-dark-40 stroke-10 stroke-light-80 dark:stroke-dark-80" }` } />
											</button>
										</div>
									</div>
									<div className="flex items-center gap-x-2">
										<ReactCountryFlag countryCode={ countryCode } svg alt={ countryName } title={ countryName } className="text-lg rounded-md" />
										<div className="font-semibold text-lg text-light-100 dark:text-dark-100">{ userName }</div>
									</div>
									<Button label="osu! profile" />
								</div>
								<div className="md:flex-grow grid grid-cols-3 gap-x-2 gap-y-1">
									<div className="font-semibold text-light-100 dark:text-dark-100">Score</div>
									<div className="col-span-2 font-semibold text-right text-light-80 dark:text-dark-80">{ numberToSeparatedThousandsString(score) }</div>
									<div className="font-medium text-light-60 dark:text-dark-60">Country</div>
									<div className="col-span-2 font-medium text-right text-light-80 dark:text-dark-80"># { numberToSeparatedThousandsString(countryScoreRank) }</div>
									<div className="font-medium text-light-60 dark:text-dark-60">Global</div>
									<div className="col-span-2 font-medium text-right text-light-80 dark:text-dark-80"># { numberToSeparatedThousandsString(globalScoreRank) }</div>
									<div className="font-semibold text-light-100 dark:text-dark-100">pp</div>
									<div className="col-span-2 font-semibold text-right text-light-80 dark:text-dark-80">{ numberToSeparatedThousandsString(performancePoints) }</div>
									<div className="font-medium text-light-60 dark:text-dark-60">Country</div>
									<div className="col-span-2 font-medium text-right text-light-80 dark:text-dark-80"># { numberToSeparatedThousandsString(countryPerformanceRank) }</div>
									<div className="font-medium text-light-60 dark:text-dark-60">Global</div>
									<div className="col-span-2 font-medium text-right text-light-80 dark:text-dark-80"># { numberToSeparatedThousandsString(globalPerformanceRank) }</div>
								</div>
							</div>
							:
							<div className="flex justify-center items-center w-full h-93 lg:h-48">
								<div className="flex flex-col items-center gap-y-2">
									<FontAwesomeIcon icon={ faCircleNotch } className="text-3xl text-light-60 dark:text-dark-80 animate-spin" />
									<div className="font-medium text-light-100 dark:text-dark-100">Fetching data...</div>
								</div>
							</div>
					}
					<div className="flex lg:hidden justify-end">
						<button type="button" onClick={ () => onCloseClick() } className="px-3 py-1 font-medium active:bg-light-40 dark:active:bg-dark-60 text-light-80 dark:text-dark-80 rounded-lg">Close</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileDialog;
