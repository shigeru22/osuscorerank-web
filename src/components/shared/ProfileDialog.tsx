import React, { useState, useEffect, useContext } from "react";
import isUndefined from "lodash/isUndefined";
import isString from "lodash/isString";
import findIndex from "lodash/findIndex";
import parseInt from "lodash/parseInt";
import ReactCountryFlag from "react-country-flag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCircleNotch, faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "./inputs/Button";
import { settingsContext } from "../../views/App";
import { IResponseData } from "../../types/api/Response";
import { ICountryScoreResponseData, IGlobalScoreResponseData } from "../../types/api/Score";
import { getCountryScores, getGlobalScores, getUserScore } from "../../utils/api/Scores";
import { numberToSeparatedThousandsString } from "../../utils/Number";
import { LogType } from "../../utils/Logging";

function ProfileDialog({ htmlRef, userId, starred, setOpened, onCloseClick, onStarClick }: { htmlRef?: React.Ref<HTMLDivElement>, userId: number, starred: boolean, setOpened: React.Dispatch<React.SetStateAction<boolean>>, onCloseClick: () => void, onStarClick: () => void }) {
	const { addLogData, setShowErrorDialog } = useContext(settingsContext);

	const [ isFetched, setFetched ] = useState(false); // height = 420 - 48px for fetching
	const [ isLoading, setLoading ] = useState(true);

	const [ userName, setUserName ] = useState("");
	const [ osuId, setOsuId ] = useState(-1);
	const [ countryName, setCountryName ] = useState("");
	const [ countryCode, setCountryCode ] = useState("");

	const [ score, setScore ] = useState(0);
	const [ performancePoints, setPerformancePoints ] = useState(0);

	const [ countryScoreRank, setCountryScoreRank ] = useState(0);
	const [ globalScoreRank, setGlobalScoreRank ] = useState(0);
	const [ countryPerformanceRank, setCountryPerformanceRank ] = useState(0);
	const [ globalPerformanceRank, setGlobalPerformanceRank ] = useState(0);

	useEffect(() => {
		async function getSelectedUserData() {
			const userScore = await getUserScore(userId); // TODO: use get user score endpoint

			if(!isUndefined(userScore.data)) {
				let rankings: (IResponseData<ICountryScoreResponseData> | IResponseData<IGlobalScoreResponseData>)[] = [];
				{
					const requests = [];
					requests.push(getCountryScores(userScore.data.score.user.country.countryId, 1, false));
					requests.push(getCountryScores(userScore.data.score.user.country.countryId, 2, false));
					requests.push(getGlobalScores(1, false));
					requests.push(getGlobalScores(2, false));

					rankings = await Promise.all(requests);
				}

				setUserName(userScore.data.score.user.userName);
				setOsuId(userScore.data.score.user.osuId);
				setCountryName(userScore.data.score.user.country.countryName);
				setCountryCode(userScore.data.score.user.country.countryCode);

				setScore(isString(userScore.data.score.score) ? parseInt(userScore.data.score.score, 10) : userScore.data.score.score);
				setPerformancePoints(userScore.data.score.user.isActive ? userScore.data.score.pp : -1);

				/* [0]: country score, [1]: country pp, [2]: global score, [3]: global pp */

				if(!isUndefined(rankings[0].data)) {
					setCountryScoreRank(findIndex(rankings[0].data.scores, score => score.user.userId === userId) + 1);
				}

				if(!isUndefined(rankings[1].data)) {
					setCountryPerformanceRank(findIndex(rankings[1].data.scores, score => score.user.userId === userId) + 1);
				}

				if(!isUndefined(rankings[2].data)) {
					setGlobalScoreRank(findIndex(rankings[2].data.scores, score => score.user.userId === userId) + 1);
				}

				if(!isUndefined(rankings[3].data)) {
					setGlobalPerformanceRank(findIndex(rankings[3].data.scores, score => score.user.userId === userId) + 1);
				}

				setLoading(false);
				setFetched(true);

				addLogData(LogType.INFO, "Fetch user data success.");
			}
			else {
				addLogData(LogType.ERROR, `Fetch user data failed: ${ userScore.message }`);
				setLoading(false);
			}
		}

		addLogData(LogType.INFO, `Fetching user data (ID: ${ userId })...`);
		getSelectedUserData();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ userId ]);

	function handleStarClick() {
		onStarClick();
	}

	function handleOpenErrorDialog() {
		if(!isUndefined(setOpened)) {
			setOpened(false);
		}

		setShowErrorDialog(true);
	}

	function handleOpenOsuProfile() {
		window.open(`https://osu.ppy.sh/users/${ osuId }`, "blank");
	}

	return (
		<div className="flex h-full justify-center items-center">
			<div ref={ htmlRef } className="max-w-sm lg:max-w-xl min-h-14 max-h-150 w-4/5 bg-white dark:bg-dark-20 rounded-lg overflow-y-auto">
				<div className="relative top-0 hidden lg:block w-full">
					<button type="button" onClick={ () => onCloseClick() } className="absolute top-5 right-5">
						<FontAwesomeIcon icon={ faTimes } className="text-xl text-light-40 dark:text-dark-40 hover:text-light-60 dark:hover:text-light-60" />
					</button>
				</div>
				<div className="w-full p-6 lg:px-12 lg:py-10 space-y-4">
					{
						isFetched ?
							<div className="flex flex-col lg:flex-row items-center gap-4">
								<div className="flex flex-col items-center gap-y-2">
									<div className="w-28 bg-light-40 dark:bg-dark-40 rounded-3xl">
										<img src={ `https://a.ppy.sh/${ osuId }` } className="rounded-3xl" />
										<div className="relative bottom-0 right-0">
											<button type="button" onClick={ () => handleStarClick() } className="absolute bottom-2 right-2">
												<FontAwesomeIcon icon={ faStar } className={ `text-xl ${ starred ? "text-light-80 dark:text-dark-80" : "text-white hover:text-light-40 dark:text-dark-20 dark:hover:text-dark-40 stroke-10 stroke-light-80 dark:stroke-dark-80" }` } />
											</button>
										</div>
									</div>
									<div className="flex items-center gap-x-2">
										<ReactCountryFlag countryCode={ countryCode } svg alt={ countryName } title={ countryName } className="text-lg rounded-md" />
										<div className="font-semibold text-lg text-light-100 dark:text-dark-100 overflow-ellipsis">{ userName }</div>
									</div>
									<Button label="osu! profile" onClick={ () => handleOpenOsuProfile() } />
								</div>
								<div className="md:flex-grow grid grid-cols-3 gap-x-2 gap-y-1">
									<div className="font-semibold text-light-100 dark:text-dark-100">Score</div>
									<div className="col-span-2 font-semibold text-right text-light-80 dark:text-dark-80">{ numberToSeparatedThousandsString(score) }</div>
									<div className="font-medium text-light-60 dark:text-dark-60">Country</div>
									<div className="col-span-2 font-medium text-right text-light-80 dark:text-dark-80"># { numberToSeparatedThousandsString(countryScoreRank) }</div>
									<div className="font-medium text-light-60 dark:text-dark-60">Global</div>
									<div className="col-span-2 font-medium text-right text-light-80 dark:text-dark-80"># { numberToSeparatedThousandsString(globalScoreRank) }</div>
									<div className="font-semibold text-light-100 dark:text-dark-100">pp</div>
									<div className="col-span-2 font-semibold text-right text-light-80 dark:text-dark-80">{ performancePoints > -1 ? numberToSeparatedThousandsString(performancePoints) : "-" }</div>
									<div className="font-medium text-light-60 dark:text-dark-60">Country</div>
									<div className="col-span-2 font-medium text-right text-light-80 dark:text-dark-80"># { numberToSeparatedThousandsString(countryPerformanceRank) }</div>
									<div className="font-medium text-light-60 dark:text-dark-60">Global</div>
									<div className="col-span-2 font-medium text-right text-light-80 dark:text-dark-80"># { numberToSeparatedThousandsString(globalPerformanceRank) }</div>
								</div>
							</div>
							:
							<div className="flex justify-center items-center w-full h-93 lg:h-48">
								<div className="flex flex-col justify-center items-center gap-y-2">
									<FontAwesomeIcon icon={ isLoading ? faCircleNotch : faTimes } className={ `text-5xl text-light-60 dark:text-dark-80 ${ isLoading && "animate-spin" }` } />
									<div className="font-medium text-center text-light-60 dark:text-dark-80 whitespace-pre">
										{
											isLoading ? "Loading data..." : "Failed to fetch data.\nTry refreshing the page."
										}
									</div>
									{
										!isLoading &&
											<Button label="Error Details" onClick={ () => handleOpenErrorDialog() } />
									}
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
