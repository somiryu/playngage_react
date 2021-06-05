//id, on={true || false} (Def. false)
//style, 
//offOpacity(0.5), 
//
//duration=Number (Def. 800)
//image
import React, { useState, useEffect } from 'react'
import anime from "../Animations/anime"

export default (props) => {
	const offOpacity = props.offOpacity || 0.5
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		const state = props.on || false
		const init = state ? offOpacity : 1
		const to = state ? 1 : offOpacity

		let duration = props.duration || 500;
		if (!isLoaded) duration = 0;

		anime({
			targets: "#" + props.id,
			opacity: [init, to],
			duration: duration,
			easing: "linear"
		})

		if (isLoaded) {
			anime({
				targets: "#" + props.id,
				scale: [1, 1.1],
				duration: duration / 2,
				easing: "linear",
				direction: "alternate"
			})
		}

		setIsLoaded(true)
	}, [props.on, props.offOpacity, props.id, isLoaded, offOpacity, props.duration])

	return (
		<div id={props.id} className="OpacityIndicator testBox"
			style={{
				...props.style, position: "relative",
				display: "inline-block", maxWidth: "100%",
				opacity: 0
			}}
		>
			<img alt="icon"
				src={props.image}
				style={{
					display: "block",
					margin: "auto",
					maxWidth: "100%",
				}}
			/>
		</div>
	)
}

