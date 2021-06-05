/* <Tabs data={data} tabClicked={optionalFunction}>
		{(colWidth, _data)=>{
			<div>Content from _data</div>
		}}
	</Tabs>

ex: data = [
    		{label: "Conocimiento", data: [
	    		{title: "CODE", data: this.state.levels.dev},
	    		{title: "INFRAESTRUCTURA", data: this.state.levels.ops},
	    	]},
    		{label: "Experticia", data: [
	    		{title: "CODE", data: []},
	    		{title: "INFRAESTRUCTURA", data: []},
	    	], state: "locked"},
    	]
*/

import React, { Component} from 'react'
import Col from "./Col.js"
import LabeledButton from "./LabeledButton.js"

class Tabs extends Component{
    constructor(props){
    	super(props);
    	this.state = {currentTab: 0}
    	this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(id){
    	this.setState({currentTab: id})
    	if(this.props.tabClicked){
    		this.props.tabClicked(id);
    	}
    }

    render(){
    	const colWidth = 100 / this.props.data.length 
    	return( 
	    	<div className="tabs">
	    		<div className="tabsButtons">
	    			{this.props.data.map((item, i) =>
	    				<Col key={i} width={colWidth}>
		    				<LabeledButton 
		    					parentClick={this.clickHandler}
		    					id={i} 
		    					label={item.label} 
		    					state={
		    						item.state && item.state === "locked" ?
		    						 "locked" :
		    						 i === this.state.currentTab ? 
		    						 	"on" : "off"
		    					}/>
		    			</Col>	
	    			)}
	    		</div>
	    		<div className="tabsContent">
	    			{this.props.children(colWidth, this.props.data[this.state.currentTab])}
	    		</div>
	      </div>
	    )
    }
}

export default Tabs;
