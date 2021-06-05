import React, { Component} from 'react'
import ReactDOM from "react-dom";

class Modal extends Component{
    avoidBubbling = (e) => e.stopPropagation();

    render(){
    	const width = this.props.width || 50
    	const height=this.props.height || 80
    	const opacity=this.props.opacity || 0.7
    	const display = this.props.open ? "block" : "none"
    	console.log("Modal", display)
    	return ReactDOM
    		.createPortal(
		    	<div onClick={this.avoidBubbling} id="Modal"
		    		style={{
		    			position:"fixed",
		    			width:"100vw",
		    			height: "100%",
		    			left:"50%", top:"50%",
		    			transform:"translate(-50%,-50%)",
		    			backgroundColor:"rgba(0,0,0,"+opacity+")",
		    			display: display
		    		}}
		    	>
		    		<div id="modal-content"
		    			style={{
		    				position:"fixed",
		    				left:"50%", top:"50%",transform:"translate(-50%,-50%)",
		    				width: width, height: height,
		    				overflowY:"auto",
		    			}}
		    		>
		    			{this.props.children}
		    		</div>
		      </div>, document.querySelector("#modal")
	    	)
    }
}

export default Modal;
