//id, image, padding(5%), debug, children(opt) (FROM IMAGEDPANEL)
// listenerLeft, imageLeft, styleLeft({margin:5})
// listenerRight, imageRight, styleRight({margin:5})
//verticalAlign: "flex-start", "flex-end" ("center")
//direction: "column" ("row")

import React from "react";
import ImagedPanel from "./ImagedPanel"
import ButtonImage from "../Buttons/ButtonImage"

export default (props) => {
	let styleLeft = props.styleLeft || {margin:5}
	let styleRight = props.styleRight || {margin:5}
	return(
		<div id={props.id + "_panel"} className="PanelWithButtonCenterImaged">
			<ImagedPanel {...props}>
				<div style={{display:"flex",flexDirection: "column", justifyContent:props.verticalAlign || "center", height:"100%"}}>
				{props.children}
				<div className={props.debug ? "testBox" : ""} style={{
					display:"flex", justifyContent:"center", alignItems:"center",
					flexDirection: props.direction || "row"
				}}>
					<ButtonImage id={props.id + "_left"} style={styleLeft} image={props.imageLeft} listener={props.listenerLeft}/>
					<ButtonImage id={props.id + "_right"} style={styleRight} image={props.imageRight} listener={props.listenerRight}/>
				</div>
				</div>
			</ImagedPanel>
		</div>
	)
}