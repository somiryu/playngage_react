/* Login for engine 
	this.state has options to modify
	change Style in render() const style

	listener() => returns player obj
*/
import React, { Component} from 'react'
import engine,{Players} from "../Utils/engine"

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			current: "login",
			allow_registration: false,
			require_username: true,
			error:"",
			message: "",
			message_color: "var(--beige)",
			error_color: "var(--light-red)",
			wrong_password: "Código incorrecto / Incorrect code",
			wrong_email: "Verifica el email / Verify email",
			no_match_passwords:"Las cédulas no coinciden",
			signin: "Ingresa / Enter",
			signup: "Regístrate / Sign up",
			signinBtn: "Enviar / Send",
			signupBtn: "Enviar / Send",
			
			/* Button */
			bgDefault: "var(--olive)",
			bgOn: "var(--olive-50)",
			labelDefault: "var(--beige)",
			labelOn: "var(--beige)",
			bg: "var(--olive)", /* as bgDefault */
			label: "var(--beige)", /* as label_default */
			loading: false,
			
			/* Fields */
			username_placeholder: "Apodo / Nickname",
			email_placeholder: "Email",
			password_placeholder: "Código personal / Personal Code",
			confirm_password_placeholder: "Confirma tu código personal",
			field_spacing: 30,
			username: "",
			email: "",
			password: "", /* Works as id_in_app in engine */
			confirm_password:"",	

			// inmmutable: just for painting, just for registration
			secondary_fields: [
				// {name: "team", type:"collection",options:[
				// 	{id: "dev", name: "Dev (Desarrollo)"},
				// 	{id: "ops", name: "Ops (Operaciones)"},
				// ]},
			],

			// values for secondary fields 
			// create one for each named object in secondary fields
			// team:"dev",
		}

		this.handleInputs = this.handleInputs.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleView = this.toggleView.bind(this);
	}

	handleInputs(event){
		const target = event.target;
	   let value = target.type === 'checkbox' ? target.checked : target.value;
	   const name = target.name;
	   if(name === "email"){value = value.toLowerCase()}
	   this.setState({[name]: value});
	}

	handleSubmit(e){
		if(!this.state.loading){
			console.log("Submitting");
			/* Validations */
			if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email) ){} else { 
				this.setState({error: "Email inválido. Verificar"});
				return
			}

			//if(this.state.password === ""){this.setState({error: this.state.wrong_password});return}
			if(this.state.current === "registration"){
				if(this.state.confirm_password === ""){this.setState({error: "Confirma la constraseña"});return}
				if(this.state.require_username && this.state.username === ""){this.setState({error: "Ingresa un nombre de usuario"});return}
				if(this.state.confirm_password !== this.state.password){this.setState({error: this.state.no_match_passwords});return}
			} 
			
			/* After Validations */
			this.setState((state) => {
				return {
					message:"Validando...",
					error:"",
					bg: state.bgOn, 
					label: state.labelOn, 
					loading: true
				}
			})	

			const callError = (msg) =>{
				this.setState({
					message: "",
					error:msg, 
					loading:false,
					bg: this.state.bgDefault,
					label: this.state.labelDefault
				})
				return;
			}

			/* API CALLS */
			if(this.state.current === "login"){
				/* LOGIN */
				let pass =  this.state.password
				if(!this.state.require_password){
					pass = this.state.email.replace("@","_").split(".").join("-")
				}
				Players.get_or_create(pass, (data)=>{
					console.log(data)
					engine.logIn(pass)
					this.props.listener(data)
				}, {name: this.state.username, email: this.state.email})
			} else if(this.state.current === "registration"){
				/* CREATE PLAYER */
				const state = this.state
				let params = {email: state.email}
				if(state.require_username){params.name = this.state.username}
				if(state.secondary_fields[0]){
					params.properties = {}
					const sf = state.secondary_fields
					for(let i=0;i<sf.length;i++){
						params.properties[sf[i].name] = state[sf[i].name]
					}
				}
				Players.create(
					this.state.password,
					params,
					(data) => {
						console.log("Player Creation", data);
						if(data.success === false){
							callError("El jugador ya existe.")
						} else {
							engine.logIn(this.state.password);
							this.props.listener(data)
						}
					}
				)
			}
		} else {console.log("Prevented")}		
	}

	toggleView(){
		this.setState((state)=>{
			let view = state.current === "login" ? "registration" : "login"
			return {current: view}
		})
	}

	render(){
		const title = this.state.current === "login" ?
			this.state.signin : this.state.singup
		const sendBtn = this.state.current === "login" ?
			this.state.signinBtn : this.state.singupBtn
		const linkTitle = this.state.current === "login" ?
			this.state.signupbtn : this.state.signin
		const style = {
			display:"block",margin:"auto", 
			marginTop: this.state.field_spacing,
			width: "35%",
			padding: 10, fontSize: 16,
			backgroundColor: "var(--olive-50)",
			border: "1px solid var(--yellow)",
			borderRadius: "20px",
			MozBorderRadius: "20px",
			WebkitBorderRadius: "20px",
			outline: "none",
			color: "white",
			fontFamily: "Baskervville",
		}
		const styleSelect = {
			display:"block",margin:"auto", 
			marginTop: this.state.field_spacing,
			width: "65%",
			padding: 10, fontSize: 12,
			color: "black",
		}
		const linkStyle = {
			textAlign:"center",
			marginTop: this.state.field_spacing,
			cursor:"pointer"
		}

		const submit_style ={
			display:"block",margin:"auto", 
			marginTop: this.state.field_spacing,
			padding: "10px 20px", fontSize:18, 
			color: this.state.label, 
			backgroundColor: this.state.bg,
			border: "1px solid "+this.state.bg, 
			cursor: "pointer",
			borderRadius: "25px",
			MozBorderRadius: "25px",
			WebkitBorderRadius: "25px",
			fontFamily: "Oregano",
			outline: "none",
		}
		return( 
			<div id="Login" style={{marginTop:40}}>
				<div className="relative">
					<h2 className="titleLogin">{title}</h2>
					<h3 
						 className="Error" style={{color: this.state.error_color,}}
					>{this.state.error}</h3>
					<h3 
						style={{textAlign:"center",margin: "20px 0 0", color: this.state.message_color}}
					>{this.state.message}</h3>
					
					{this.state.require_username &&
						<input
							style={style}
							placeholder={this.state.username_placeholder}
							type="text"
							name="username"
							value={this.state.username}
							onChange={this.handleInputs} 
						/>
					}

					<input
						style={style}
						placeholder={this.state.email_placeholder}
						type="text"
						name="email"
						value={this.state.email}
						onChange={this.handleInputs} 
					/>

					{ this.state.current === "registration" &&
						<div>
							<input
								style={style}
								placeholder={this.state.confirm_password_placeholder}
								type="password"
								name="confirm_password"
								value={this.state.confirm_password}
								onChange={this.handleInputs} 
							/>
							{this.state.secondary_fields.map((item, i)=>{
								if(item.type==="collection"){
									return(<select 
										style={styleSelect}
										key={i} 
										name={item.name}
										value={this.state[item.name]}
										onChange={this.handleInputs}
									>
										{item.options.map((opt, j)=>
											<option value={opt.id} key={j}>{opt.name}</option>
										)}
									</select>
									)
								} else {return false}
							})}
						</div>


					}
					<input 
						type="submit" 
						style={submit_style} 
						value={sendBtn}
						onClick={this.handleSubmit}
					/>
				</div>
				{this.state.allow_registration &&
					<h3
						onClick={this.toggleView} 
						style={linkStyle}>{linkTitle}</h3>
				}
			</div>
		)
	}
}

export default Login;
