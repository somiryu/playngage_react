//requires_code, only_lobby=true, autoJoin=true (skips from code to join)
import React,{useState, useEffect} from "react";
import engine,{Load, Rooms} from "../Utils/engine";
import PanelWithDecorations from "../../shared/Panels/PanelWithDecorations";

//IMAGES
import decoration from "../../assets/decoration.png";

export default (props) => {
	const [step, setStep] = useState(1)
	const [msg, setMsg] = useState("")
	const [rooms, setRooms] = useState([])
	const [instances, setInstances] = useState([])
	const [instance, setInstance] = useState(null)
	const [code, setCode] = useState("")
	const [loading, setLoading] = useState(true)

	useEffect(()=>{Rooms.all((d)=>{setLoading(false);setRooms(d)})}, [])

	const selectRoom = (room) =>{
		setStep(2);
		if(!props.requires_code){
			setLoading(true)
			const opts = props.only_lobby ? {by_state: "lobby"} : {}
			Rooms.instances(room.id, (d)=>{setLoading(false);setInstances(d)}, opts)
		}
	}

	const selectInstance = (instance) =>{setStep(3);setInstance(instance)}

	const search = () =>{
		Rooms.by_code(code, (d)=>{
			if(d.success === false){setMsg(d.status);return}
			if(props.autoJoin){
				realJoin(d.id)
			} else {
				setInstance(d); setStep(3)
			}
		})
	}

	const realJoin = (id) =>{
		Rooms.join(id, (d)=>{
			setLoading(false)
			if(d.success === true){
				props.listener()
			}else if(d.status === "Already in the room"){
				props.listener()
			}else{
				setMsg(d.status)
			}
		}, {code: code})
	}

	const join = () =>{
		setLoading(true)
		realJoin(instance.id)
	}

	if(loading) return <Load id="rooms_selector_1"/>;

	return(
		<div className="RoomSelector">
			{step === 1 &&
				<h3 className="titleLogin">{engine.t("select_game")}</h3>
			}
			{step === 1 && rooms.map((e, i) => 
				<div key={i} className="room_container">
				<PanelWithDecorations
					id="PanelWithDecorations"
					bgColor="var(--brown)"
					width="400px"
					imageTop={decoration}
					imageBottom={decoration}
					topOffset="-43%"
					bottomOffset="44%"
				>
					<div onClick={()=>selectRoom(e)}>
						<div className="room_name">{engine.t(e.name)}</div>
						<div className="room_description" dangerouslySetInnerHTML={{__html: engine.t(e.description)}}/>
						<div className="room_players">
							{engine.t("min_participants")}: {e.min_participants} - {engine.t("max_participants")}: {e.max_participants}
						</div>
						<div className="btnNext">
							{engine.t("continue")}
						</div>
					</div>
				</PanelWithDecorations>
				</div>
			)}
			{step === 2 && props.requires_code &&
				<div>
					<h3 className="titleLogin">{engine.t("enter_game_code")}</h3>
					<div className="code_selector">
						<input type="text" value={code} placeholder={engine.t("enter_code")} onChange={(e)=>setCode(e.target.value)}/>
						<button onClick={()=>search() }>{engine.t("send")}</button>
					</div>
				</div>
			}
			{step === 2 && !props.requires_code &&
				<div>
					<h3 className="titleLogin">Selecciona una mesa</h3>
					{instances.map((e, i)=>
						<div key={i} style={{padding: 10, border: "1px solid black", cursor: "pointer"}}
							onClick={()=>selectInstance(e)}
						>
							Juego #{e.id}<br/>
							Estado: {e.state}<br/>
							¿Requiere código? {e.requires_code ? "Sí" : "No"}<br/>
						</div>
					)}
				</div>
			}
			{step === 3 &&
				<div className="pre-lobby"> 
					<h3 className="titleLogin">{engine.t("room")}</h3>
					<div className="game_info">
						<PanelWithDecorations
							id="PanelWithDecorations"
							bgColor="var(--brown)"
							width="400px"
							imageTop={decoration}
							imageBottom={decoration}
							topOffset="-43%"
							bottomOffset="44%"
						>
							<div className="game_id">{engine.t("game")} #{instance.id}</div>
							<div className="game_state">{engine.t("state")}: {instance.state}</div>
						</PanelWithDecorations>
					</div>
					{engine.getUser() ?
						<div>
							{instance.requires_code && code === "" &&
								<div>
									<h3 className="titleLogin">{engine.t("enter_code")}</h3>
									<input type="text" value={code} placeholder={engine.t("enter_code")} onChange={(e)=>setCode(e.target.value)}/>
								</div>
							}
					
							<div className="join_button" onClick={join}>
								{instance.state === "lobby" ? engine.t("join") : engine.t("enter")}
							</div>
						</div>
						:
						<div>{engine.t("register_join")}</div>
					}
				</div>
			}
			<div style={{color: "red"}}>{msg}</div>
		</div>
	)
}