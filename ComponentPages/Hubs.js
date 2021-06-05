import React, {useState} from "react";
//Hubs
import GrayscaleWithTwoOpacities from "../Hubs/GrayscaleWithTwoOpacities"
import MaskedAvatar from "../Hubs/MaskedAvatar"
import CurrencyList from "../Hubs/CurrencyList";

export default (props) => {
	const [state1, setState1] = useState(false)
	const [state2, setState2] = useState(false)
	const [state3, setState3] = useState(false)

	return(
		<div className="Hubs">
			<But text={state1 ? false : true} listener={setState1}/>
			<But text={state2 ? false : true} listener={setState2}/>
			<But text={state3 ? false : true} listener={setState3}/>
			<hr/>
			<GrayscaleWithTwoOpacities
				id="hub1"
				mainOn={state1}
				indicator1={state2}
				indicator2={state3}
				top={-10}
				left={50}
				mainImage={props.images.rec400}
				indicator1Image={props.images.sq40}
				indicator2Image={props.images.circ40}
			/>
			<hr/>
			<MaskedAvatar
				id="colaborador1"
				avatar={props.images.Avatar}
				containerImage={props.images.AvatarContainer}
				padding={12}
				maskBorder={100}
				height={132}
			/>
			<div className="testBox" style={{width: "100px"}}>
				<h4>CurrencyList</h4>
				<CurrencyList 
					currencies={ {xp: {image: props.images.circ40, quantity: 20}, score: {image: props.images.sq40, quantity: 25}} }
					duration={1000} //2000
					fontSize="1.3em" //1.1em
					fontFamily="Arial" //inherit
					childStyle={{color: "var(--red)"}} //{}
				/>
			</div>

		</div>
	)
}

function But(props){
	return(
		<div 
			style={{margin:2,backgroundColor: "blue", color:"white", cursor: "pointer", width:100, padding: 10, textAlign:"center", display:"inline-block"}}
			onClick={()=>{props.listener(props.text)}}>
			{props.text === true ? "OFF" : props.text === false ? "ON" : props.text}
		</div>
	)
}