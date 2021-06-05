//children
//seconds: default: 6000
//message: text or false
import React,{useState, useEffect, useRef} from "react";
import anime from "../Animations/anime"
export default (props) =>{
	const [message, setMessage] = useState(false)
	const timeOut = useRef()

	useEffect(()=>{
		if(props.message){
			if(timeOut.current) clearTimeout(timeOut);
			setMessage(props.message)
			anime({
				targets: "#"+props.id,
				opacity: [0,1],
				duration: 1000,
				easing: "easeOutSine",
			})
			let id = setTimeout(()=>{
				anime({
					targets: "#"+props.id,
					opacity: [0],
					duration: 1000,
					easing: "easeInSine",
				})
				setTimeout(()=>{
					if(props.listener) props.listener()
				}, 1000)
			}, props.seconds || 6000)
			timeOut.current = id
		}
		return ()=>{clearTimeout(timeOut.current)}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.message])

	const close = () =>{
		clearTimeout(timeOut.current)
		if(props.listener) props.listener()
		setMessage(null)
	}

	if(props.message === "set") return <div id={props.id}></div>

	return (
		<div className="AlertFlash" onClick={close} id={props.id}>
			{message && props.children}
		</div>
	)
}