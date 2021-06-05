//id: uuid, color(opt): background color
import React, { Component } from 'react'
import anime from "../Animations/anime"

class Loading extends Component {
	componentDidMount() {
		anime({
			targets: "#" + this.props.id,
			left: [25, 75],
			rotate: 180,
			duration: 1000,
			easing: "linear",
			direction: "alternate",
			loop: true,
		})
	}
	render() {
		return (
			<div className="Loading" style={{ height: "85px", position: "relative" }}>
				<div id={this.props.id}
					className="loadingDot"
					style={{
						position: "absolute", top: "50%", left: "25%", width: "10px",
						height: "10px", background: this.props.color || "black"
					}}
				></div>
			</div>
		)
	}
}

export default Loading;
