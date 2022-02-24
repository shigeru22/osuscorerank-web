import React from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEquals, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Triangle } from "../../assets/triangle.svg";
import { IRankingListData } from "../../types/components/RankingList";
import { numberToSeparatedThousandsString } from "../../utils/Number";

function RankingList({ data, onDeleteClick }: { data: IRankingListData[], onDeleteClick?: (value: number) => void }) {
	function DeltaItem({ delta }: { delta: number }) {
		if(delta === 0) {
			return <FontAwesomeIcon icon={ faEquals } className="text-light-100 dark:text-dark-100" />;
		}
		else if(delta < 0) {
			return (
				<div className="flex gap-x-2 items-center">
					<Triangle className="w-3 h-3 rotate-180 fill-danger-light-active dark:fill-danger-dark-active -z-10" />
					<div className="font-medium text-light-100 dark:text-dark-100">{ Math.abs(delta) }</div>
				</div>
			);
		}
		else if(delta > 0) {
			return (
				<div className="flex gap-x-2 items-center">
					<Triangle className="w-3 h-3 fill-success-light dark:fill-success-dark -z-10" />
					<div className="font-medium text-light-100 dark:text-dark-100">{ Math.abs(delta) }</div>
				</div>
			);
		}

		return <div className="font-medium text-danger-light-active">Inf.</div>;
	}

	return (
		<div>
			<table className="text-left leading-8">
				<thead>
					<tr>
						<th className="w-20 xl:w-28 2xl:w-32 pl-4 font-medium pr-2 text-light-80 dark:text-dark-80 cursor-default">Rank</th>
						<th className="w-48 xl:w-52 pr-2 font-medium text-light-80 dark:text-dark-80 cursor-default">Username</th>
						{
							!_.isUndefined(onDeleteClick) ?
								<>
									<th className="w-56 xl:w-64 pr-2 font-medium text-light-80 dark:text-dark-80 cursor-default">Score</th>
									<th className="w-36 xl:w-42 pr-2 font-medium text-light-80 dark:text-dark-80 cursor-default">pp</th>
									<th className="w-22 xl:w-28 pr-2 font-medium text-light-80 dark:text-dark-80 cursor-default">Delta</th>
									<th className="pr-8 font-medium text-light-80 dark:text-dark-80 cursor-default" />
								</>
								:
								<>
									<th className="w-64 xl:w-72 2xl:w-80 pr-2 font-medium text-light-80 dark:text-dark-80 cursor-default">Score</th>
									<th className="w-36 xl:w-44 2xl:w-52 pr-2 font-medium text-light-80 dark:text-dark-80 cursor-default">pp</th>
									<th className="w-12 xl:w-16 2xl:w-28 pr-11 font-medium text-light-80 dark:text-dark-80 cursor-default">Delta</th>
								</>
						}
					</tr>
				</thead>
				<tbody>
					{
						data.length > 0
							? data.map(item => (
								!_.isUndefined(item) &&
								<tr key={ item.id } className="group group-hover:bg-light-20 dark:group-hover:bg-dark-40">
									<td className="pl-4 pr-2 group-hover:bg-light-20 dark:group-hover:bg-dark-40 font-medium text-light-100 dark:text-dark-100 rounded-l-lg cursor-default">{ item.rank }</td>
									<td className="pr-2 group-hover:bg-light-20 dark:group-hover:bg-dark-40 font-medium text-light-100 dark:text-dark-100 cursor-default">{ item.userName }</td>
									<td className="pr-2 group-hover:bg-light-20 dark:group-hover:bg-dark-40 font-medium text-light-100 dark:text-dark-100 cursor-default">{ numberToSeparatedThousandsString(item.score) }</td>
									<td className="pr-2 group-hover:bg-light-20 dark:group-hover:bg-dark-40 font-medium text-light-100 dark:text-dark-100 cursor-default">{ numberToSeparatedThousandsString(item.pp) }</td>
									<td className={ `pr-2 group-hover:bg-light-20 dark:group-hover:bg-dark-40 font-medium text-light-100 dark:text-dark-100 ${ _.isUndefined(onDeleteClick) && "rounded-r-lg" } cursor-default` }>
										<DeltaItem delta={ item.delta } />
									</td>
									{
										!_.isUndefined(onDeleteClick) &&
										<td className={ `pr-2 group-hover:bg-light-20 dark:group-hover:bg-dark-40 font-medium text-light-100 dark:text-dark-100 ${ !_.isUndefined(onDeleteClick) && "rounded-r-lg" } cursor-default` }>
											<FontAwesomeIcon icon={ faTrash } onClick={ () => onDeleteClick(item.id) } className="text-danger-light active:text-danger-light-active cursor-pointer" />
										</td>
									}
								</tr>
							))
							:
							<tr className="leading-42">
								<td colSpan={ 5 }>
									<div className="flex flex-col justify-center items-center w-full h-full font-medium text-danger-light-active">
										No data found.
									</div>
								</td>
							</tr>
					}
				</tbody>
			</table>
		</div>
	);
}

export default RankingList;
