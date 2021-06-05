import React, { Component} from 'react'
import simplePanel from "../../../static/images/containers/simplePanel.png"

class SimplePanel extends Component{
    render(){
    	return( 
	    	<div className="SimplePanel relative">
	    		<img alt="panelSimple" src={simplePanel} className="absoluteCentered max100" />
	    		<h3 className="absoluteCentered">{this.props.title}</h3>
	    		<div className="absolute panelContent">
		    		<table>
			    		<tbody>
				    		{this.props.data.map(item =>
				    			<tr key={item.id}>
									<td>{item.name}</td>
									<td>=</td>
									<td style={{textAlign: "right"}}>{item.score}</td>
					    		</tr>
				    		)}
		    			</tbody>
			    	</table>
	    		</div>
	    		
	     	</div>
	    )
    }
}

export default SimplePanel;
