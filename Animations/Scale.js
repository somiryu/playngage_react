import React, {useEffect} from "react";
import anime from "./anime"

window.anime = anime
export default (props)=>{
	useEffect(()=>{
		let elem = document.getElementById(props.id || "Scale")
		anime({
			targets: elem,
			duration: props.duration || 500,
			easing: props.easing || "easeOutSine",
			delay: props.delay || 0,
			scale: [props.from || 0, 1]
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	useEffect(()=>{
		if(props.out){
			let elem = document.getElementById(props.id || "Scale")
			anime({
				targets: elem,
				duration: props.duration || 500,
				easing: props.easing || "easeInSine",
				delay: props.delay || 0,
				scale: [1, props.from || 0]
			})
		}
		setTimeout(()=>{
				if(props.outListener){props.outListener(props.id || "slideDown")}
			}, props.duration + 100)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[props.out])

	return(
		<div id={props.id || "Scale"}>
			{props.children}
		</div>
	)
}