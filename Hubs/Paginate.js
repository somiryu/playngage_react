import React, {useState, useEffect} from "react";

export default (props) =>{
	let currentText = props.text.split(". ")
	if(currentText[currentText.length - 1] === ""){currentText.pop()}
	const [currentIndex, setCurrentIndex] = useState(0)

	if(!currentText[currentIndex]){
		if(props.onFinish) props.onFinish()
	}
	
	useEffect(()=>{
		setCurrentIndex(0)
	}, [props.text])

	useEffect(()=>{
		if(props.page){
			props.page({current: currentIndex + 1, total: currentText.length})
		}
		 // eslint-disable-next-line
	}, [currentIndex, props.text])

	let text = (props.preText || "") + currentText[currentIndex]
	if(currentText[currentIndex + 1]) text += "..."
	return(
		<div className="Paginate">
			<div className="paginateText" dangerouslySetInnerHTML={{__html: text}}/>
		
			{currentText[currentIndex + 1] ? 
				<div className="paginateButton paginateNext" onClick={()=>setCurrentIndex(currentIndex + 1)}>
					{props.button}
				</div>
				:
				props.onFinish && <div className="paginateButton finishPaginate"  onClick={()=>props.onFinish()}>
					{props.buttonFinish || props.button}
				</div>
			}
		</div>
	)
}