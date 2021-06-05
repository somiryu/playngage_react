import React from 'react'
import {translations} from "../Language"

export default ({lang, onClick, klass, icon, }) => {
	const g = translations[lang].general
	return( 
		<div onClick={onClick} className={klass || "FaIcon" }>
			{icon==='bars' ?
				<div style={{fontSize:"19px",color:"#3A133E"}}>{g.sobre}</div> :
				<i className={"fa fa-" + icon}/>
			} 
		</div>
	)
}
