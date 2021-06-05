import React, {useEffect} from "react";
import anime from "./anime"

window.anime = anime
export default (props)=>{
	useEffect(()=>{
		let elem = document.getElementById(props.id || "slideDown")
		anime({
			targets: elem,
			duration: props.duration || 500,
			easing: props.easing || "easeOutSine",
			delay: props.delay || 0,
			translateY: [props.from || -1000, 0]
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	useEffect(()=>{
		if(props.out){
			let elem = document.getElementById(props.id || "slideDown")
			anime({
				targets: elem,
				duration: props.duration || 500,
				easing: props.easing || "easeInSine",
				delay: props.delay || 0,
				translateY: [0, props.from || -1000]
			})
			if(props.listenerOut){
				setTimeout(() => props.listenerOut(props.id) , (props.durationEnd || 500) + 100);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[props.out])
	
	return(
		<div style={props.style} id={props.id || "slideDown"}>
			{props.children}
		</div>
	)
}