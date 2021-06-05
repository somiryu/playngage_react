import React, {useState} from "react";
import PanelWithButtonCenter from "../Panels/PanelWithButtonCenter"
import PanelWithButtonCenterImaged from "../Panels/PanelWithButtonCenterImaged"
import PanelWithTwoButtonsImaged from "../Panels/PanelWithTwoButtonsImaged"
import ImagedPanel from "../Panels/ImagedPanel"


export default (props) => {
	const [debug, setDebug] = useState(true)
	return(
		<div className="Panels">
			<span>Debug</span>
			<But text={debug ? false : true} listener={setDebug}/>
			<hr/>
			<div className="testBox">
				<h3>ImagedPanel</h3>
				<ImagedPanel 
					id="tiP1" 
					image={props.images.rec600} 
					debug={debug} //testBox appears
					padding="10%" //5%
				> 
					<div style={{color:"white"}}> Children Optional Children Optional Children Optional Children Optional Children Optional Children Optional Children Optional Children Optional </div>
				</ImagedPanel>
			</div>
			<div className="testBox">
				<h3>PanelWithButtonCenter</h3>
				<PanelWithButtonCenter id="pwbc2" debug={debug} listener={()=>{}}>
					<h3>Has Children</h3>
				</PanelWithButtonCenter>
			</div>
			<div className="testBox">
				<h3>PanelWithButtonCenterImaged</h3>
				<PanelWithButtonCenterImaged
					id="pwbc2" 
					image={props.images.rec600}
					listener={()=>{}} 
					bottom={20} //10
					debug={debug} //testBox appears
					buttonPadding={10} //10
					textWidth={70} //80
					textHeight={45} //70
					width="100%" //100% (maxWidth)
				>
					<h1 style={{textAlign:"center", color:"white"}}>HOLA!</h1>
				</PanelWithButtonCenterImaged>
			</div>
			<div className="testBox">
				<h3>PanelWithTwoButtonsImaged</h3>
				<PanelWithTwoButtonsImaged
					id="pwbc3"
					image={props.images.rec200}
					imageLeft={props.images.circ40}
					imageRight={props.images.sq40}
					listenerLeft={()=>{console.log("Click Left")}}
					listenerRight={()=>{console.log("Click Right")}}
					direction="row" //"row"
					debug={debug}
				>
					<p style={{textAlign:"center", color:"white"}}>Optional</p>
				</PanelWithTwoButtonsImaged>
				<PanelWithTwoButtonsImaged
					id="pwbc4"
					image={props.images.sq200}
					imageLeft={props.images.circ40}
					imageRight={props.images.sq40}
					listenerLeft={()=>{console.log("Click Left")}}
					listenerRight={()=>{console.log("Click Right")}}
					direction="column"
					debug={debug}
				>
				</PanelWithTwoButtonsImaged>
				<PanelWithTwoButtonsImaged
					id="pwbc4"
					image={props.images.sq200}
					imageLeft={props.images.circ40}
					imageRight={props.images.sq40}
					listenerLeft={()=>{console.log("Click Left")}}
					listenerRight={()=>{console.log("Click Right")}}
					direction="column"
					verticalAlign="flex-end"
					debug={debug}
				>
				</PanelWithTwoButtonsImaged>
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