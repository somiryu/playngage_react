//Requires Animations/AnimatedScore
//id, quantity, duration(2000), image, fontSize(1.1em), fontFamily(inherit), childStyle, styleX, displayX
import React from 'react'
import AnimatedScore from "../Animations/AnimatedScore"

function CurrencyHorizontal(props){
  return(
      <div className="CurrencyHorizontal" style={{
        display:"flex",flexDirection:"row",textAlign:"center",alignItems:"center", justifyContent:"center"
      }}>
  			<div className="img" style={{display:"inline-block"}}>
  				<img alt="curIcon" src={props.image} style={{maxWidth:"100%"}}/>
  			</div>
        {props.displayX && <div style={{...props.childStyle, ...props.styleX}}>x</div>}
  			<div className="qty font2" style={{fontSize: props.fontSize || "1.1em", fontFamily: props.fontFamily || "inherit"}}>
          <AnimatedScore id={props.id} to={props.quantity} childStyle={props.childStyle || {}} duration={props.duration || 2000}/>
        </div>
           
      </div>
  )
}
export default CurrencyHorizontal;
