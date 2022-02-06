import React from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

function TextInput({ name, label, icon, value, setValue }: { name: string, label: string, icon?: IconDefinition, value?: string, setValue?: React.Dispatch<React.SetStateAction<string>> }) {
	function handleTextChange(value: string) {
		if(!_.isUndefined(setValue)) {
			setValue(value);
		}
	}

	return (
		<div className="w-56 space-y-2 font-medium text-light-80">
			<label htmlFor={ name }>{ label }</label>
			{
				_.isUndefined(icon)
					? <input type="text" id={ name } name={ name } value={ value } onChange={ e => handleTextChange(e.target.value) } className="form-input w-full px-3 py-1.5 font-medium bg-light-20 text-light-100 caret-light-100 border-none focus:ring-0 rounded-md" />
					:
					<div className="flex group">
						<label htmlFor={ name }>
							<div className="py-1.5 pl-3 bg-light-20 rounded-l-md">
								<FontAwesomeIcon icon={ icon } className={ `my-auto ${ !_.isEmpty(value) ? "text-light-80" : "text-light-40 group-hover:text-light-80" }` } />
							</div>
						</label>
						<div className="flex-grow">
							<input type="text" id={ name } name={ name } value={ value } onChange={ e => handleTextChange(e.target.value) } className="form-input w-full py-1.5 pl-2 pr-3 font-medium bg-light-20 text-light-100 caret-light-100 border-none focus:ring-0 rounded-r-md" />
						</div>
					</div>
			}
		</div>
	);
}

export default TextInput;
