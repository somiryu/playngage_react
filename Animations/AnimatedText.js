/* 
<AnimatedText 
	value={text} 
	id={uuid} 
/>
*/
import React, { Component} from 'react'
import anime from "./anime"

class AnimatedText extends Component{
	constructor(props){
		super(props);
		this.animate = this.animate.bind(this)
		this.animation = null;
	}

	animate(){
		let msg = this.props.value
		let e = document.getElementById("animatedText"+this.props.id).firstChild
		let v = {init: 0}

		this.animation = anime({
		  targets: v,
		  init: msg.length,
		  easing: 'linear',
		  delay: this.props.delay || 0,
		  duration: msg.length * 30,
		  update: function() {
		    e.innerHTML = msg.substring(0,v.init);
		  }
		});	
	}

	componentDidMount(){
		this.animate(this.props.value)
	}

	componentDidUpdate(prev){
		if(this.props.value !== prev.value){	
			if(this.animation){ this.animation.pause();}
			this.animate(this.props.value)
		}
	}


	render(){
		// console.log("AnimatedText", this.props);
		return( 
			<div className="AnimatedText" id={"animatedText"+this.props.id}>
			 	<span></span>
			</div>
		)
	}
}

export default AnimatedText;
