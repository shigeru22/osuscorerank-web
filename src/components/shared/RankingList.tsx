import React from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { IRankingListData } from "../../types/components/RankingList";
import { numberToSeparatedThousandsString } from "../../utils/Number";

function RankingList({ data, onUserClick, onDeleteClick }: { data: IRankingListData[], onUserClick?: (value: number) => void, onDeleteClick?: (value: number) => void }) {
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
									<th className="pr-8 font-medium text-light-80 dark:text-dark-80 cursor-default" />
								</>
								:
								<>
									<th className="w-64 xl:w-72 2xl:w-80 pr-2 font-medium text-light-80 dark:text-dark-80 cursor-default">Score</th>
									<th className="w-36 xl:w-44 2xl:w-52 pr-2 font-medium text-light-80 dark:text-dark-80 cursor-default">pp</th>
								</>
						}
					</tr>
				</thead>
				<tbody>
					{
						data.length > 0
							? data.map(item => (
								!_.isUndefined(item) &&
								<tr key={ item.id } onClick={ () => !_.isUndefined(onUserClick) && onUserClick(item.id) } className={ `group group-hover:bg-light-20 dark:group-hover:bg-dark-40 ${ !_.isUndefined(onUserClick) && "cursor-pointer" }` }>
									<td className={ `pl-4 pr-2 group-hover:bg-light-20 dark:group-hover:bg-dark-40 font-medium ${ item.isActive ? "text-light-100 dark:text-dark-100" : "text-light-80 dark:text-dark-80" } rounded-l-lg` }>{ item.rank }</td>
									<td className={ `pr-2 group-hover:bg-light-20 dark:group-hover:bg-dark-40 font-medium ${ item.isActive ? "text-light-100 dark:text-dark-100" : "text-light-80 dark:text-dark-80" }` }>{ item.userName }</td>
									<td className={ `pr-2 group-hover:bg-light-20 dark:group-hover:bg-dark-40 font-medium ${ item.isActive ? "text-light-100 dark:text-dark-100" : "text-light-80 dark:text-dark-80" }` }>{ numberToSeparatedThousandsString(item.score) }</td>
									<td className={ `pr-2 group-hover:bg-light-20 dark:group-hover:bg-dark-40 font-medium ${ item.isActive ? "text-light-100 dark:text-dark-100" : "text-light-80 dark:text-dark-80" } ${ _.isUndefined(onDeleteClick) ? "rounded-r-lg" : "" }` }>{ item.isActive ? numberToSeparatedThousandsString(item.pp) : "-" }</td>
									{
										!_.isUndefined(onDeleteClick) &&
										<td className={ `pr-2 group-hover:bg-light-20 dark:group-hover:bg-dark-40 font-medium text-light-100 dark:text-dark-100 ${ !_.isUndefined(onDeleteClick) && "rounded-r-lg" }` }>
											<FontAwesomeIcon icon={ faTrash } onClick={ () => onDeleteClick(item.id) } className="text-danger-light active:text-danger-light-active" />
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
