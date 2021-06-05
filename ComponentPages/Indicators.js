import React, {useState} from "react";
import OpacityIndicator from "../Indicators/OpacityIndicator";
import GrayscaleIndicator from "../Indicators/GrayscaleIndicator";
import CurrencyHorizontal from "../Indicators/CurrencyHorizontal";

export default (props) => {
	const [indicator, setIndicator] = useState(false)
	const [qty, setQty] = useState(30)
	return(
		<div className="Indicators">
			<But text={indicator ? false : true} listener={setIndicator}/>
			<input type="text" value={qty} onChange={(e)=>{setQty(e.target.value)}}/>
			<div className="testBox">
				<h4>OpactityIndicator</h4>
				<OpacityIndicator
					id="starGray"
					image={props.images.sq40}
					on={indicator} // false
					offOpacity={0.3} //0.5
					duration={500} //800
					style={{margin:"10px"}} //{}
				/>
			</div>
			<div className="testBox">
				<h4>GrayscaleIndicator</h4>
				<GrayscaleIndicator
					id="level"
					on={indicator}
					image={props.images.circ40}
					offGrayscale={80} //100
					duration={500} //500
					style={{margin:"10px"}} //{}
				/>
			</div>
			<div className="testBox" style={{width: "100px"}}>
				<h4>CurrencyHorizontal</h4>
				<CurrencyHorizontal 
					id="testCur" 
					quantity={qty} 
					image={props.images.sq40}
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