//id, image, listener, style({}), scale(1.1)
import React from 'react'
import anime from "../Animations/anime"

function Button(props){
   const clickHandler = () =>{
	   anime({
	      targets: "#"+props.id,
	      scale: props.scale || 1.1, 
	      duration: 200,
	      direction: "alternate",
	      easing: "linear",
	      complete: function(anim){
	      	props.listener && props.listener(props.id);
	      }
	   })  
   }

 	return( 
    	<div id={props.id} className="ButtonImage"
    		style={{...props.style, cursor:"pointer", display:"inline-block"}}
    		onClick={clickHandler}
    	>	
    		<img alt="boton" src={props.image} style={{width: "100%"}}/>
      </div>
   )
}

export default Button;
