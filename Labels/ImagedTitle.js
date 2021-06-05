import React from 'react'
import bg from "../../images/CONTENEDORES/titleBg.png"

function ImagedTitle(props){
	return( 
		<div className="ImagedTitle relative">
			<img className="backgrounds" src={bg} alt="bg"/>
			<h1 className="absoluteCenteredXY" style={{top:"53%",width:"100%"}}>{props.value}</h1>
		</div>
	)
}

export default ImagedTitle;