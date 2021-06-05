import React from "react";
//import "TopHub.css"

export default (props) =>{

	let style = {position:"fixed",top:0,width:"inherit",zIndex:1}


	return(
		<div className="TopHub testBox" style={style}>
			<div className="testBox" style={{position:"relative"}}>
				<img src={props.image} style={{width:"100%"}} alt=""/> 
				<div className="testBox" style={{position:"absolute", top:0, left:0, width:"100%", height:"100%"}}>
					{props.children}
				</div>
			</div>
		</div>
	)
}