import React from "react";

export default (props) => {
	return(
		<div className="PanelWithButtonCenter" id={props.id}>
			<div className={props.debug ? "testBox":""}>
				{props.children}
				<center>
					<div onClick={props.listener} style={{cursor:"pointer"}}>
						Siguiente
					</div>
				</center>
			</div>
		</div>
	)
}