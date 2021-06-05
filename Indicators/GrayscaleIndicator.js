//id, style, offGrayscale, 
//on={true || false} (Def. false)
//duration=miloseconds Def. 500
//image
import React from 'react'

export default (props) => {
	let grayscale = props.offGrayscale || 100
	if(props.on) grayscale = 0;
	const duration = (props.duration || 500) / 1000


    return( 
    	<div id={props.id} className="GrayscaleIndicator testBox"
    		style={{...props.style, position:"relative", 
    			display:"inline-block",maxWidth:"100%",
    		}}
    	>	
    		<img alt="icon" 
    			src={props.image} 
    			style={{
    				display:"block",
    				margin:"auto",
    				maxWidth:"100%",
    				filter: "grayscale(" + grayscale + "%)",
    				transition: "filter "+duration+"s"
    			}}
    		/>    	
      	</div>
    )
}

