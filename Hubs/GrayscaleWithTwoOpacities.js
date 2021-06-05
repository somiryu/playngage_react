//id
//style
//mainOn
//mainImage
//indicator1Image
//indicator2Image
//top
//left
//indicator1={true|| false}
//indicator2={true|| false}

import React from "react";
import GrayscaleIndicator from "../Indicators/GrayscaleIndicator"
import OpacityIndicator from "../Indicators/OpacityIndicator"

export default (props) =>{
	let style={
		display:"flex", alignItems:"center", justifyContent:"center",
		position:"absolute"
	}
	if(props.top) style.top = props.top;
	if(props.bottom) style.bottom = props.bottom;
	if(props.left) style.left = props.left;
	if(props.right) style.right = props.right;
	return(
		<div className="GrayscaleWithTwoOpacities"
			style={{...props.style, position:"relative", display:"inline-block", maxWidth:"100%"}}
		>
			<GrayscaleIndicator id={props.id+"_gray"}
				on={props.mainOn}
				image={props.mainImage}
			/>
			<div style={style}>
				<OpacityIndicator
					style={{margin:"5px"}}
					id={props.id+"_ind1"}
					on={props.indicator1}
					offOpacity={0.3}
					image={props.indicator1Image}
				/>
						
				<OpacityIndicator
					id={props.id+"_ind2"}
					on={props.indicator2}
					offOpacity={0.3}
					image={props.indicator2Image}
				/>
			</div>

		</div>
	)
}