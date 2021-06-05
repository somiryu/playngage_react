import React, { useState } from "react";
import ButtonImage from "../Buttons/ButtonImage";
import ButtonMultiState from "../Buttons/ButtonMultiState";

const Buttons = (props) => {
	const [state1, setState1] = useState("off");

	return (
		<div className="Buttons">
			<But text="on" listener={() => setState1("on")} />
			<But text="off" listener={() => setState1("off")} />
			<But text="locked" listener={() => setState1("locked")} />
			<But text="disabled" listener={() => setState1("disabled")} />

			<hr />
			<div className="testBox">
				<h3>ButtonImage</h3>
				<ButtonImage
					id="btn1"
					image={props.images.circ40}
					listener={(id) => { console.log("clicked", id) }}
					scale={1.1} //1.1
					style={{ margin: 10 }} // {}
				/>
			</div>
			<div className="testBox">
				<h3>ButtonMultiState</h3>
				<ButtonMultiState
					id="btn2"
					state={state1}
					scale={1.2} //1.1
					images={{ off: props.images.sq80, on: props.images.circ80, nata: props.images.circ40 }}
					listeners={{
						off: () => { setState1("on") },
						on: () => { setState1("nata") },
					}}
					styles={{ off: { filter: "grayscale(100%)" } }}
				/>
			</div>
		</div>
	)
}

export default Buttons

function But(props) {
	return (
		<div
			style={{ margin: 2, backgroundColor: "blue", color: "white", cursor: "pointer", width: 100, padding: 10, textAlign: "center", display: "inline-block" }}
			onClick={() => { props.listener(props.text) }}>
			{props.text === true ? "OFF" : props.text === false ? "ON" : props.text}
		</div>
	)
}