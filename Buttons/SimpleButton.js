/* requires anime.js
<SimpleButton
	id={uuid}
	color="String: purple, orange, pink..."
	label=""
	labelColor optional
	bgColor options
	fill={optional bool}
	listener={func} optional
	scale={1.1} optional
	disable=optional bool
/>
*/
import React, {useState} from 'react'
import "./SimpleButton.css"

function SimpleButton(props){
	const [clicked, setClicked] = useState(false)
	const clickHandler = () => {
	 	if(!clicked){
	 		setClicked(true)
		 	if(props.disable){return false}
		 	var scale = props.scale || 1.05
		   console.log("clicked", props.id)
		   window.anime({
		      targets: "#"+props.id,
		      scale: scale, duration: 200,
		      direction: "alternate",
		      easing: "linear",
		      complete: function(anim){
		      	setClicked(false)
		      	setTimeout(()=>props.listener && props.listener(props.id), 100)
		      }
		   })
		}
	}
   let color = props.color || "purple"
   if(color === "var(--purple)") color = "purple";
   if(color === "var(--pink)") color = "pink";
   if(color === "var(--orange)") color = "orange";
   if(color === "var(--yellow)") color = "yellow";
   
   if(props.disable) color = "grey";
   const style = {}
   if(props.labelColor){style.color = props.labelColor}
   if(props.bgColor){style.backgroundColor = props.bgColor}

 	return( 
    	<div 
    		id={props.id}
			onClick={clickHandler}
			className={"simple-btn btn-"+color + (props.fill ? " btn-fill" : " btn-outline")}
			style={style}
		>
			{props.label}
		</div>
    )
}

export default SimpleButton;
