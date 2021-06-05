//currencies: {xp: {image: (imaage ||{image: image}), quantity: 30}} (per engine), direction: "row || column"
//duration(2000), fontSize(1.1em), fontFamily(inherit), childStyle({})
//Require CurrencyHorizontal or CurrencyVertical(TODO)
//displayX, styleX #=> for x between currency and icon

import React from "react";
import CurrencyHorizontal from "../Indicators/CurrencyHorizontal"

export default (props) => {
	return(
		<div className="CurrencyList">
			{Object.keys(props.currencies).map((tag)=>
				<div key={tag}>
					<CurrencyHorizontal 
						id={tag}
						quantity={props.currencies[tag].quantity}
						image={props.currencies[tag].image.image || props.currencies[tag].image}
						{...props}
					/>
				</div>
			)}
		</div>
	)
}