//image, label, offsetY, listener
import React, { Component} from 'react'
import anime from "../Utils/anime"

class Button extends Component{
    clickHandler = () =>{
    	const t = this
    	var scale = this.props.scale || 1.1
	   console.log("clicked", this.props.id)
	   anime({
	      targets: "#"+this.props.id,
	      scale: scale, duration: 200,
	      direction: "alternate",
	      easing: "linear",
	      complete: function(anim){
	      	t.props.listener && t.props.listener("home");
	      }
	   })

	   
    }
    render(){
    	const top = 50 + (this.props.offsetY ? this.props.offsetY : 0)
    	return( 
	    	<div id={this.props.id} className="Button relative"
	    		style={{cursor:"pointer"}}
	    		onClick={this.clickHandler}
	    	>	
	    		<img alt="boton" 
	    			src={this.props.image} 
	    			className="centeredImage max100"
	    		/>
	    		<h3 className="absolute"
	    			style={{top:top+"%", left: "50%", transform:"translate(-50%,-50%)"}}
	    		>
	    			{this.props.label}
	    		</h3>
	      </div>
	    )
    }
}

export default Button;
