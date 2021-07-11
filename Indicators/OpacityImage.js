//id, image, listener
import React from 'react'

export default (props) => 
	<div id={props.id} className="OpacityButton testBox" style={{cursor:"pointer",position:"relative"}}>	
		<img alt="icon" 
			src={props.image} 
			style={{
				display:"block",
				margin:"auto",
				maxWidth:"100%",
			}}
		/>
	</div>
	    



