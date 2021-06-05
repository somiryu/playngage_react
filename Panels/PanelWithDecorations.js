//id
//bgColor=color del contenedor
//width= ancho del contenedor
//height= alto del contenedor
//imageTop
//TopHeight
//imageBottom
//TopHeight} || "100%"
//BottomHeight || "100%"
//padding || "5%"
//overflow= default(true)
//children(opt)


import React from "react";

export default (props) => {
	let overflow = props.overflow ? 'auto' : 'none'
	let mainStyle = {position:"relative", backgroundColor:props.bgColor, width:props.width}
	if(props.height) mainStyle.height = props.height;
	return(
		<div className="PanelWithDecorations" id={props.id} style={mainStyle}>
			<div className="imgTop" style={{position: "absolute",top: 0, left:"50%", transform:"translate(-50%,"+ props.topOffset || 0 +")"}}>
				<img src={props.imageTop} style={{width:"100%"}} alt=""/>
			</div>
			<div className="imgBottom" style={{position: "absolute",bottom: 0, left:"50%", transform:"translate(-50%, "+ props.bottomOffset || 0 +")"}}>
				<img src={props.imageBottom} style={{width:"100%"}} alt=""/>
			</div>
			<div style={{
				position:"relative",
				width:"100%",
				padding: props.padding || "5%",
				boxSizing: "border-box",
				height:"100%",
			}} className={props.debug ? "testBox" : ""}>
				<div style={{overflow, height:"100%"}}>
					{props.children}
				</div>
			</div>

			
		</div>
	)
}