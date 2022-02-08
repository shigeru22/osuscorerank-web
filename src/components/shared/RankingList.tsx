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
			return <FontAwesomeIcon icon={ faEquals } className="text-light-100" />;
		}
		else if(delta < 0) {
			return (
				<div className="flex gap-x-2 items-center">
					<Triangle className="w-3 h-3 rotate-180 fill-danger-light-active" />
					<div className="font-medium text-light-100">{ Math.abs(delta) }</div>
				</div>
			);
		}
		else if(delta > 0) {
			return (
				<div className="flex gap-x-2 items-center">
					<Triangle className="w-3 h-3 fill-success-light" />
					<div className="font-medium text-light-100">{ Math.abs(delta) }</div>
				</div>
			);
		}

		return <div className="text-danger-light-active">Inf.</div>;
	}

	return (
		<div>
			<table className="text-left leading-8">
				<thead>
					<tr>
						<th className="w-20 pl-4 font-medium text-light-80 cursor-default">Rank</th>
						<th className="w-48 font-medium text-light-80 cursor-default">Username</th>
						{
							!_.isUndefined(onDeleteClick) ?
								<>
									<th className="w-56 font-medium text-light-80 cursor-default">Score</th>
									<th className="w-36 font-medium text-light-80 cursor-default">pp</th>
									<th className="w-22 font-medium text-light-80 cursor-default">Delta</th>
									<th className="pr-8 font-medium text-light-80 cursor-default" />
								</>
								:
								<>
									<th className="w-64 font-medium text-light-80 cursor-default">Score</th>
									<th className="w-36 font-medium text-light-80 cursor-default">pp</th>
									<th className="pr-11 font-medium text-light-80 cursor-default">Delta</th>
								</>
						}
					</tr>
				</thead>
				<tbody>
					{
						data.length > 0
							? data.map(item => (
								<tr key={ item.id } className="group">
									<td className="pl-4 group-hover:bg-light-20 font-medium text-light-100 rounded-l-lg cursor-default">{ item.rank }</td>
									<td className="group-hover:bg-light-20 font-medium text-light-100 cursor-default">{ item.userName }</td>
									<td className="group-hover:bg-light-20 font-medium text-light-100 cursor-default">{ numberToSeparatedThousandsString(item.score) }</td>
									<td className="group-hover:bg-light-20 font-medium text-light-100 cursor-default">{ numberToSeparatedThousandsString(item.pp) }</td>
									<td className={ `group-hover:bg-light-20 font-medium text-light-100 ${ _.isUndefined(onDeleteClick) && "rounded-r-lg" } cursor-default` }>
										<DeltaItem delta={ item.delta } />
									</td>
									{
										!_.isUndefined(onDeleteClick) &&
										<td className={ `group-hover:bg-light-20 font-medium text-light-100 ${ !_.isUndefined(onDeleteClick) && "rounded-r-lg" } cursor-default` }>
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
