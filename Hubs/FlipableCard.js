//width: 300, height: 300
//Add back-visibility:hidden to nested divs in the faces if necesary
import React from 'react'

export default ({width = 300, height = 399, front, back}) =>( 
	<div className="FlipableCard" style={{width, height}}>
		<div className="flip-card-inner">
			<div className="flip-card-front">{front}</div>
			<div className="flip-card-back">{back}</div>
		</div>
	</div>
)
