
import React, { useState } from "react";
import Panels from "./Panels"
import Hubs from "./Hubs"
import Indicators from "./Indicators"
import Buttons from "./Buttons"
import Labels from "./Labels"

//import "ComponentName" from "./{Capeta/}Component"
import Loading from "../Loaders/Loading";

//test images
import circ100 from "../ExampleImages/Circ-100.png"
import circ200 from "../ExampleImages/Circ-200.png"
import circ300 from "../ExampleImages/Circ-300.png"
import circ20 from "../ExampleImages/Circ-20.png"
import circ40 from "../ExampleImages/Circ-40.png"
import circ60 from "../ExampleImages/Circ-60.png"
import circ80 from "../ExampleImages/Circ-80.png"

import rec200 from "../ExampleImages/rec-200.png"
import rec400 from "../ExampleImages/rec-400.png"
import rec600 from "../ExampleImages/rec-600.png"
import rec20 from "../ExampleImages/rec-20.png"
import rec40 from "../ExampleImages/rec-40.png"
import rec60 from "../ExampleImages/rec-60.png"
import rec80 from "../ExampleImages/rec-80.png"

import sq200 from "../ExampleImages/square-200.png"
import sq400 from "../ExampleImages/square-400.png"
import sq20 from "../ExampleImages/square-20.png"
import sq40 from "../ExampleImages/square-40.png"
import sq60 from "../ExampleImages/square-60.png"
import sq80 from "../ExampleImages/square-80.png"
import AvatarContainer from "../ExampleImages/avcont.png"
import Avatar from "../ExampleImages/avatar.png"


const images = {
	circ20: circ20, circ40: circ40, circ60: circ60, circ80: circ80,
	circ100: circ100, circ200: circ200, circ300: circ300,
	rec20: rec20, rec40: rec40, rec60: rec60, rec80: rec80,
	rec200: rec200, rec400: rec400, rec600: rec600,
	sq20: sq20, sq40: sq40, sq60: sq60, sq80: sq80,
	sq200: sq200, sq400: sq400,
	Avatar: Avatar,
	AvatarContainer: AvatarContainer,
}

export default ({ back }) => {
	const [compType, setCompType] = useState("Textos");

	return (
		<div className="Components">
			<div className="App-link" onClick={back}>Back</div>
			<div>Import with</div>
			<code>import Module from "./playngage_react/{compType}/Module"</code>
			<h1>{compType}</h1>
			<But text="Textos" listener={setCompType} />
			<But text="Buttons" listener={setCompType} />
			<But text="Indicators" listener={setCompType} />
			<But text="Loaders" listener={setCompType} />
			<But text="Panels" listener={setCompType} />
			<But text="Hubs" listener={setCompType} />
			<But text="Labels" listener={setCompType} />
			<But text="Animations" listener={setCompType} />
			<But text="Modules" listener={setCompType} />

			<hr />
			{compType === "Textos" &&
				<div>
					<p>Solo referencia de los tama??os establecidos en el css com??n. No se importan.</p>
					<h1>Titulo H1</h1>
					<h2>Titulo H2</h2>
					<h3>Titulo H3</h3>
					<h4>Titulo H4</h4>
					<p>P??rrafo</p>
					<p className="p1">P??rrafo</p>
					<label>Label</label>
					<label className="label1">Label2</label>
				</div>
			}

			{compType === "Buttons" &&
				<Buttons images={images} />
			}

			{compType === "Indicators" &&
				<Indicators images={images} />

			}

			{compType === "Loaders" &&
				<div>
					<Loading id="load_component" color="white" />
				</div>
			}

			{compType === "Panels" &&
				<Panels images={images} />
			}
			{
				compType === "Hubs" &&
				<Hubs images={images} />
			}
			{compType === "Labels" &&
				<Labels images={images} />
			}

		</div>
	)
}


function But(props) {
	return (
		<div
			style={{ margin: 2, backgroundColor: "blue", color: "white", cursor: "pointer", width: 150, padding: 10, textAlign: "center", display: "inline-block" }}
			onClick={() => { props.listener(props.text) }}>
			{props.text === true ? "OFF" : props.text === false ? "ON" : props.text}
		</div>
	)
}