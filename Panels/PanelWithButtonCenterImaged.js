// image=IMAGE*
// listener=FUNCTION*
// id (Optional)
// width=panelMaxWidth "100%""
// bottom=percentageFromBottom 10
// textWidth=textWidthPercentage 80
// buttonPadding=SeparationBetweenTextAdnButton 10
// textHeight=percentage 70
// children=panelContentHTML


import React from "react";

export default (props) => {
	let style = {position: "relative", display:"inline-block"}
	if(props.width) style.maxWidth = props.width;
	if(props.debug) style.border = "1px dashed blue"

	let buttonStyle = {
		position: "absolute",
		bottom: (props.bottom || 10) + "%",
		width:"100%",
		display:"flex",
		alignItems:"center",
		justifyContent: "center",
	}

	let textWidth = props.textWidth || 80 
	let marginLeft = (100 - textWidth) / 2
	let buttonPadding = props.buttonPadding || 10

	let mainStyle = {
		position: "absolute",
		width: textWidth + "%",
		height: (props.textHeight || 70) + "%",
		marginLeft: marginLeft + "%",
		overflow:"auto",
		bottom: (props.bottom + buttonPadding || 80) + "%",
	}
	return(
		<div className="PanelWithButtonCenterImaged" style={style} id={props.id}>
			<img alt="" src={props.image} style={{
				width:"100%",
			}}/>
			<div style={mainStyle} className={props.debug ? "testBox" : ""}>
				{props.children}
			</div>
			<div style={buttonStyle} className={props.debug ? "testBox" : ""}> 
				<div style={{cursor:"pointer"}} onClick={props.listener} className={props.debug ? "testBox" : ""}>
					Siguiente
				</div>
			</div>
			
		</div>
	)
}