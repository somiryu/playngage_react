//UNCOMMENT AND INSTALL yarn add websocket / npm install websocket
// import {useState, useEffect} from "react"
// import { w3cwebsocket as W3CWebSocket } from "websocket"; 
// import engine, {config} from "./engine"
// //props: token, id_in_app, room_id
// export default (props) =>{
//   const [message, setMessage] = useState("")
//   const [client, setClient] = useState(null)
//   const [params] = useState(props.params)


//   useEffect(()=>{
//     console.log("token", config.getToken())
//     if(!engine.getUser()) return;
//     console.log("NOT LOADED")
//     const msg = {
//       command: 'subscribe',
//       identifier: JSON.stringify({
//         ...params,
//         token: config.getToken(),
//         channel: props.channel +'Channel',
//       }),
//     };
//     const c = new W3CWebSocket(config.getCableUrl()+config.getToken()+'/'+engine.getUser());
//     c.onopen = () => {
//        console.log('WebSocket Client Connected');
//        c.send(JSON.stringify(msg))
//     };
//     c.onmessage = (message) => { //when true message, it does not contain a type
//       let msg = JSON.parse(message.data)
//       if(msg.type && msg.type !== "ping"){
//         setMessage(msg.type); 
//       } else if(!msg.type && msg.message){ setMessage(msg.message);}
//     };
//     setClient(c)
//     return () => {
//       console.log("unmounted websocket")
//     }
//   }, [props.channel, params])

// 	return [message, client]
// }