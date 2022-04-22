import React, { HTMLInputTypeAttribute } from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

function TextInput({ name, label, icon, type, value, setValue }: { name: string, label: string, icon?: IconDefinition, type?: HTMLInputTypeAttribute, value?: string, setValue?: React.Dispatch<React.SetStateAction<string>> }) {
	function handleTextChange(value: string) {
		if(!_.isUndefined(setValue)) {
			setValue(value);
		}
	}

	return (
		<div className="w-56 space-y-2">
			<label htmlFor={ name } className="font-medium text-light-80 dark:text-dark-80">{ label }</label>
			{
				_.isUndefined(icon)
					? <input type={ !_.isUndefined(type) ? type : "text" } id={ name } name={ name } value={ value } onChange={ e => handleTextChange(e.target.value) } className="form-input w-full px-3 py-1.5 font-medium bg-light-20 dark:bg-dark-40 text-light-100 caret-light-100 border-none focus:ring-0 rounded-md" />
					:
					<div className="flex group">
						<label htmlFor={ name }>
							<div className="py-1.5 pl-3 bg-light-20 dark:bg-dark-40 rounded-l-md">
								<FontAwesomeIcon icon={ icon } className={ `my-auto ${ !_.isEmpty(value) ? "text-light-80 dark:text-dark-80" : "text-light-40 dark:text-dark-60 group-hover:text-light-80 dark:group-hover:text-dark-80" }` } />
							</div>
						</label>
						<div className="flex-grow">
							<input type={ !_.isUndefined(type) ? type : "text" } id={ name } name={ name } value={ value } onChange={ e => handleTextChange(e.target.value) } className="form-input w-full py-1.5 pl-2 pr-3 font-medium bg-light-20 dark:bg-dark-40	 text-light-100 dark:text-dark-100 caret-light-100 dark:caret-dark-100 border-none focus:ring-0 rounded-r-md" />
						</div>
					</div>
			}
		</div>
	);
}

export default TextInput;
