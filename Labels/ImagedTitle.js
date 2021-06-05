import React from 'react'

function ImagedTitle({ bg, value }) {
	return (
		<div className="ImagedTitle relative">
			<img className="backgrounds" src={bg} alt="bg" />
			<h1 className="absoluteCenteredXY" style={{ top: "53%", width: "100%" }}>value}</h1>
		</div>
	)
}

export default ImagedTitle;