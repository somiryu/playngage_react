import React, { useReducer, useEffect } from 'react';
//error, warning, success 
const initial = {visible: "invisible", messages: "", type: "success"}
const init = (initialState) => initialState.type ? {visible: "visible", messages: initialState.messages, type: initialState.type || "error"} : initial

const reducer = (state, action) =>{
	if(action.type === "reset") return initial
	if(action.type === "fade") return {...state, visible: "invisible"}
	return {...state, visible: "visible", messages: action.messages, type: action.type}
}

export default (initialState) => {
	const [state, dispatch] = useReducer(reducer, initialState, init)
	window.flash = ({messages, type = "error"}) => dispatch({type, messages})
	useEffect(()=>{if(state.messages !== "") setTimeout(() => dispatch({type: "fade"}), 50000)}, [state])

  return (
		<div onClick={()=>dispatch({type: "fade"})} className={`alert ${state.visible}`}>
			{typeof(state.messages) === 'string' ? <p className={state.type}>{state.messages}</p> :	
				state.messages.map(message=><p key={message} className={state.type}>{message}</p>)
			}
		</div>
  )
}
