/*
<ProgressBar
	percentage={10}
	height={10}
	bgColor="grey"
	barColor="green"
/>
*/
import React, { Component} from 'react'
import anime from "./Animations/anime"
//import "./ProgressBar.css"

class ProgressBar extends Component{
	componentDidMount(){this.updateBar()}
	componentDidUpdate(){this.updateBar()}
	updateBar = () =>{
		anime({
			targets: "#bar_" + this.props.id,
			width: (this.props.percentage || 0) + "%",
			duration: 300,
			easing: "easeOutSine",
			delay:500
		})
	}
	render(){
		return( 
			<div className="ProgressBar">
				<div className="progressBg"
					style={{
						position:"relative",
						height: this.props.height || 10,
						backgroundColor: this.props.bgColor || "grey",
						borderRadius: this.props.borderRadius || 0
					}}
				>
					<div id={"bar_" + this.props.id} className="progressBar"
						style={{
							width: "0%",
							position:"absolute",
							height: this.props.height || 10,
							backgroundColor: this.props.barColor || "green",
							borderRadius: this.props.borderRadius || 0
						}}
					/>
				</div>
			</div>
		)
	}
}

export default ProgressBar;
