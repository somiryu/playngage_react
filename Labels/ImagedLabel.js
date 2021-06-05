import React from "react";

export default (props)=>{
	let mainStyle = {position: "absolute",top: 0, left:0, width:"100%", height:"100%"}
	return(
		<div className="ImagedLabel testBox" style={{position:"relative", display:"inline-block"}}>
			<img alt="" src={props.image} style={{width:"100%"}}/>
			<div style={mainStyle} className={props.debug ? "testBox" : ""}>
				<div style={{
						position:"relative", width:"100%",
						boxSizing: "border-box",
						height:"100%",
						display:"flex", justifyContent:"center", alignItems:"center", 
						flexDirection:"column"
					}} className={props.debug ? "testBox" : ""}>
						<div style={{overflow:"hidden", boxSizing:"border-box", textAlign: props.textAlign || "center", padding: props.padding || 5}} className={props.debug ? "testBox" : ""}>
							{props.label}
						</div>
				</div>
			</div>
		</div>
	)
}