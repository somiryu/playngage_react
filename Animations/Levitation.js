import React, {useEffect} from "react";
import anime from "./anime"

window.anime = anime
export default (props)=>{
	useEffect(()=>{
		let elem = document.getElementById(props.id || "Levitation")
		let anim = anime({
			targets: elem,
			duration: props.duration || 500,
			easing: props.easing || "linear",
			delay: props.delay || 0,
			translateY:  [0, props.to || "10%"],
			endDelay: props.endDelay || 300,
			direction: "alternate",
			loop: true
		})
		return ()=>{
			anim.pause()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return(
		<div id={props.id || "Levitation"}>
			{props.children}
		</div>
	)
}