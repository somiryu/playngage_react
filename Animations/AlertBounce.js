import React, {useEffect} from "react";
import anime from "./anime"

window.anime = anime
export default (props)=>{
	useEffect(()=>{
		let elem = document.getElementById(props.id || "AlertBounce")
		let anim = anime({
			targets: elem,
			duration: props.duration || 500,
			easing: props.easing || "easeOutSine",
			delay: props.delay || 0,
			scale: [1, props.to || 0.9],
			endDelay: props.endDelay || 1000,
			direction: "alternate",
			loop: true
		})
		return ()=>{
			anim.pause()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return(
		<div id={props.id || "AlertBounce"}>
			{props.children}
		</div>
	)
}