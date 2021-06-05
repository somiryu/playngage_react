import React from "react";
//import "Frame.css"

export default (props) =>{

	let style = {position: "fixed", top:0,width:"100vw", height:"100vh"}


	return(
		<div className="Frame testBox" style={style}>
			<div className="testBox" style={{position:"fixed", height:props.leftHeight, left:0 }}>
				<img src={props.imageLeft} style={{height:"100%"}} alt=""/> 
			</div>
			<div className="testBox" style={{position:"fixed", height:props.rightHeight, right:0 }}>
				<img src={props.imageRight} style={{height:"100%"}} alt=""/> 
			</div>
			<div className="testBox" style={{position:"fixed", width:props.topWidth, top:0 }}>
				<img src={props.imageTop} style={{width:"100%"}} alt=""/> 
			</div>
			<div className="testBox" style={{position:"fixed", width:props.bottomWidth, bottom:-16 }}>
				<img src={props.imageBottom} style={{width:"100%"}} alt=""/> 
			</div>
		</div>
	)
}