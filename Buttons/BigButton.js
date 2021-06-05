//id label parentClick
import React, { Component} from 'react'
import btnBg from "../../images/CONTENEDORES/trainBg.png"

class BigButton extends Component{
	clickButton = () => {
		window.clickScale(this.props.id);
		setTimeout(()=>this.props.parentClick(this.props.id), 800)
	}

	render(){
		return( 
			<div className="BigButton" id={this.props.id}>
				<div className="relative clickable" onClick={this.clickButton}>
              <img src={btnBg} alt="btn" className="backgrounds"/>
              <h3 className="absoluteCenteredXY font2">{this.props.label}</h3>
            </div>
			</div>
		)
	}
}

export default BigButton;