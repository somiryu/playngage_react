// //props.data = [{label: "Label", component: <Component/>,]

// import React, { useState } from 'react'
// import Widget from "./Widget"

// export default ({data}) =>{
// 	const [tab, setTab] = useState(0)

// 	return( 
// 		<div id="Accordion">
// 			<Tabs data={data} tabClicked={(e)=>setTab(e)}>
// 				<Widget klass="BorderedWidget">{data[tab].component}</Widget>
// 			</Tabs>
// 		</div>
// 	)
// }


// const Tabs = ({data, tabClicked, errors, children}) =>{
//   const [currentTab, setCurrentTab] = useState(0)
// 	const clickHandler = id =>{setCurrentTab(id);if(tabClicked) tabClicked(id)}

// 	return( 
// 	  <div className="tabs">
// 	    <div className="tabsButtons">
// 	    	{data.map((item, i) =>
// 	    		<div className={"tab" + (currentTab === i ? " selected" : "") + (errors ? errors[item.scope] ? " errors" : " no-errors" : " no-errors")} 
// 	    			onClick={()=>clickHandler(i)} key={i}>{item.label}</div>	
// 	    	)}
// 	    </div>
// 	    <div className="tabsContent">
// 	    	{children}
// 	    </div>
// 	  </div>
// 	)
// }

