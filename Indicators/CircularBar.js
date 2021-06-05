//id
//fill=color
//widthOffset={0-1} percentage of total width in decimals
import React, {useState, useEffect} from "react";

export default props =>{
	const [svg, setSvg] = useState({x: 0, y: 0, radius: 0, large: 0, direction: 0, width: 0, center: 0}) //check useEffect
	const [width, setWidth] = useState(0)

	useEffect(()=>{
		const e = document.getElementById(props.id).parentElement.clientWidth
		setWidth(e)
	}, [])

	useEffect(()=>{
		
		const qty = props.qty || 0
		const max_qty = props.max_qty || 100
		const percentage = max_qty > 0 ? parseInt(qty * 100 / max_qty) : 0
		
		let degrees = percentage * 360 / 100
		const widthOffset = props.widthOffset ? width * props.widthOffset : width
		const center = width/2
		var pi = Math.PI;
  	var rad = degrees * (pi/180);	
  	console.log(degrees, rad)
  	var radius = widthOffset/2;
  	var x = center+Math.cos(rad)*radius
  	var y = center+Math.sin(rad)*radius	
		var large = 1;
  	var direction = 0;
  	if(y < center) large = 0;
  	const result = {
  		large: large, direction: direction, x: x, y: y,
  		width: widthOffset, center: center, radius: radius,
  	}
  	console.log("RESULT=>", result)
  	setSvg(result)

	}, [width, props.qty, props.max_qty, props.widthOffset])

	console.log("----_", svg)
	return(
		<svg id={props.id} className="CircularBar" width="100%" height="100%">
			<path d={`M ${svg.radius + svg.center} ${svg.center} A ${svg.radius} ${svg.radius}, 0, ${svg.large}, ${svg.direction}, ${svg.x} ${svg.y} L ${svg.center} ${svg.center} Z`} fill={props.fill || "white"}/>
		</svg>
	)
}