//params 
//label="STR" state={on|off|locked} 
//parentClick={func}

import React, { Component} from 'react'
import on from "../../images/BUTTONS/on.png"
import off from "../../images/BUTTONS/off.png"
import locked from "../../images/BUTTONS/off.png"

class StateButton extends Component{
    clickHandler = (e) =>{
    	if(this.props.state === "off"){
    		window.anime({
    			targets: e.currentTarget,
    			duration:300,
    			direction: "alternate",
    			easing: "easeOutSine", 
    			scale: [1.05]
    		})
    		this.props.parentClick(this.props.id);
    	}
    }
    render(){
    	const image = this.props.state === "on" ? on : this.props.state === "locked" ? locked : off
    	return( 
	    	<div id={"stateButton"+this.props.id}
	    		onClick={this.clickHandler} 
	    		className={"stateButton relative " + (this.props.state !== "locked" ? "clickable" : "")}>
	    		
	    		<img alt="boton" 
	    			src={image} 
	    			className="centeredImage max100"
	    		/>
	    		<h3 className={"absoluteCenteredXY label" + this.props.state}>
	    			{this.props.label}
	    		</h3>
	      </div>
	    )
    }
}

export default StateButton;