import React, {useState, useEffect} from "react";
import Button from "./LabeledButton"
import AnimatedText from "./AnimatedText"
import robot from "../../../static/images/graphics/robot.png"
import Tutorial from "../../../Utils/Tutorial"

import "./Tutorial.css"

export default (props) => {
	const tutorial = Tutorial[props.scope][props.current]
	const [index, setIndex] = useState(0)
	console.log(props.scope, props.current, index, tutorial[index])
	
	useEffect(()=>{
		let animation;

		if(props.animate){
			const opts = {
				targets: props.animate,
				scale:[1,1.1],
				direction: "alternate",
				loop: true,
				duration:300,
				easing: "linear",
			}
			if(props.translate) opts.translateX = ["-50%","-50%"];
			animation = window.anime(opts)
		}
		return () => {
			console.log("Cleaning Tutorial!")
			if(animation) animation.pause();
		}	
	}, [props.animate, props.translate])

	useEffect(()=>{
		let animation;
		if(props.animateTop){
			animation = window.anime({
				targets: props.animateTop,
				top: -20,
				direction: "alternate",
				loop: true,
				duration:300,
				easing: "linear",
			})
		}
		return () => {
			console.log("Cleaning Tutorial!")
			if(animation) animation.pause();
		}	
	}, [props.animateTop])

	if(!tutorial[index]) return <div></div>;
	return(
		<div className="tutorial">
			{props.arrowUp &&
				<div className="arrow" style={{
					top:props.arrowUp.top+"%", left:`${props.arrowUp.left}%`,
				}}>^</div>
			}
			{props.arrowDown &&
				<div className="arrow" style={{
					top:props.arrowDown.top+"%", left:`${props.arrowDown.left}%`,
				}}>Down</div>
			}
			<div className="tutorialContent">
				<div className="character">
					<img src={robot} alt="Jazz"/>
				</div>
				<div className="tutorialText">
					<div><strong>Jazzimov:</strong></div><br/>
					<AnimatedText 
						value={tutorial[index]}
						id="tutorialText"
						duration={3000}
						delay={200}
					>
						<div>...</div> 
					</AnimatedText>
				</div>
			</div>
			{tutorial[index+1] &&
				<div className="cta">
					<Button id="continueTut" state="off" label="Siguiente" parentClick={()=>setIndex(index+1)}/>
				</div>
			}
			{!tutorial[index+1] && props.current === "begin" &&
				<div className="cta">
					<Button id="saltar" state="off" label="Saltar" parentClick={()=>{setIndex(0);props.listener("false")}}/>
					<Button id="continuar" state="off" label="Continuar" parentClick={()=>{setIndex(0);props.listener("first")}}/>
				</div>
			}
			{!tutorial[index+1] && props.next &&
				<div className="cta">
					<Button id="nextTut" state="off" label="Continuar" parentClick={()=>props.listener(props.next)}/>
				</div>
			}
		</div>
	)
}