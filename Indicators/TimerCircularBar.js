//id
//diameter={Int}
//fill=color
//complete
//widthOffset={0-1} percentage of total width in decimals
//centerXOffset={px} centerYOffset={px}
//time={10} seconds
import React, {useState, useEffect} from "react";

let timer;
export default props =>{
	const [svg, setSvg] = useState({x: 0, y:0, radius: 0, large: 0, direction: 0, width: 0, centerX: 0, centerY: 0}) //check useEffect
	const [width, setWidth] = useState(0)

	useEffect(()=>{
		const e = document.getElementById(props.id).parentElement.clientWidth
		setWidth(e)
	}, [props.id])

	useEffect(()=>{
		let degrees = props.percentage ? 360 - (props.percentage * 360 / 100)  : 0
		if(timer) clearInterval(timer);
		
		if(width > 0){
			const time = props.time || 10
			const unit = ((360 - degrees) / time) / 10
			let miliSeconds = (time + 1) * 10
			timer = setInterval(()=>{
				if(props.onTick) props.onTick(parseInt(miliSeconds))
				degrees += unit;
				miliSeconds --;
				if(degrees > 360){
					degrees = 360;
					clearInterval(timer)
					if(props.onTick) props.onTick(parseInt(0))
					if(props.onComplete) props.onComplete()
				}
				const widthOffset = props.widthOffset ? width * props.widthOffset : width
				const center = width/2
				var pi = Math.PI;
		  	var rad = degrees * (pi/180);	
		  	var radius = widthOffset/2;
		  	const centerX = center + (props.centerXOffset || 0)
		  	const centerY = center + (props.centerYOffset || 0)
		  	var x = centerX+Math.cos(rad)*radius
		  	var y = centerY+Math.sin(rad)*radius	
		  	
		  	var large = 1;
		  	var direction = 0;
		  	if(y < centerY) large = 0;
		  	setSvg({
		  		large: large, direction: direction, x: x, y: y,
		  		width: widthOffset, centerX: centerX, centerY: centerY, radius: radius,
		  	})
	  	}, 100)
		}

  	return ()=>{if(timer) clearInterval(timer)}
  	// eslint-disable-next-line
	}, [width, props.percentage, props.time, props.centerYOffset, props.centerXOffset])

	return(
		<svg id={props.id} className="TimerCircularBar" width="100%" height="100%">
			<path d={`M ${svg.radius + svg.centerX} ${svg.centerY} A ${svg.radius} ${svg.radius}, 0, ${svg.large}, ${svg.direction}, ${svg.x} ${svg.y} L ${svg.centerX} ${svg.centerY} Z`} fill={props.fill}/>
		</svg>
	)
}