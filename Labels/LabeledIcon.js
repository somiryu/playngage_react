import React, { Component} from 'react'

class LabeledIcon extends Component{
	render(){
		const height = this.props.height || "100%"
		const imgPos = this.props.imgPos || "45%"
		const labelPos = this.props.labelPos || "80%"
		return( 
			<div className="LabeledIcon" style={{height: height, position:"relative"}}>
				<img src={this.props.image} alt="icon"
					style={{
						maxWidth:"100%",
						position:"absolute",
						top: imgPos,
						left: "50%",
						transform:"translate(-50%,-50%)"
					}}
				/>
				<p className="iconLabel"
					style={{
						textAlign:"center",
						width:"90%",
						position:"absolute",
						top: labelPos,
						left: "50%",
						transform:"translate(-50%,-50%)"
					}}
				>
					{this.props.label}
				</p>
			</div>
		)
	}
}

export default LabeledIcon;
