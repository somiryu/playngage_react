//width=AreaOfGameForDifferentDevices (1000)*
//padding=IfNeedsSeparation

import React from "react";
//import "PlayArea.css"

export default (props) =>{
	let style = {
		position: "relative",
		width: (props.width),
		display: "block",
		margin: "auto",
		padding: (props.padding || 0) + "%",
		maxWidth: "100%", 
		minHeight: "100vh"
	}
		

	return(
		<div className="PlayArea" style={style}>
			{props.children}
		</div>
	)
}