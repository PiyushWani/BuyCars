import React,  { Component} from 'react';
import App from './App';
import './Login.css';

class Login extends Component{
		
	constructor(props){
		super(props);
		this.state={
			route: 'LOGIN'
		}
	}
	sendCredentials = ()=>{
		const uname = this.refs.uname.value;
		const password =this.refs.password.value;
		console.log(`1. Credentials: ${uname}/${password}`);
		
		fetch('http://localhost:4000/login',{
			method:'post',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({
				uname: uname,
				password: password
			})
		})
		.then(response=>response.json())
		.then(data => 
					{
						if(data.status === 'VALID_USER')
						{
							const profile={
								name: data.name,
								email: data.email,
								customerid: data.customerid
							}
							fetch('http://localhost:4000/getCards',{
								method: 'post',
								headers: {'Content-Type':'application/json'},
								body: JSON.stringify({customerid:data.customerid})
							})
							.then(res => res.json())
							.then(data => {
								data.map((car) => 
									{
										console.log("Car Titles ", car.TITLE)
									})
								console.log("Login profile", profile)
								this.props.allowHome(profile, data);
							})						
						}	
						else{
							this.props.disallowHome();
						}					
					}
			);					
	}
	sendAccountData=()=>{
		console.log("In sendAccountData");
		const dataObj = {	uname : this.refs.runame.value,
					firstname : this.refs.rfirstname.value,
					lastname : this.refs.rlastname.value,
					password : this.refs.rpassword.value,
					email : this.refs.remail.value
				}
		
  		fetch('http://localhost:4000/registerUser',{
  			method: 'post',
  			headers: {'Content-Type':'application/json'},
  			body: JSON.stringify(dataObj)
  		})
  		.then(response => response.json())
  		.then(data => {
  			if(data.status==='SUCCESS'){
  				console.log('Register user response: ', data)
  				this.setState((prev)=>({route:'LOGIN'}));
  			}
  			else{
  				this.setState((prev)=>({route:'REGISTER'}));
  			}
  		})
	}
	registerForm=()=>{
		console.log("In registerForm");
		this.setState((prev)=>({route:'REGISTER'}))

	}
	loginForm=()=>{
		console.log("In loginForm");
		this.setState((prev)=>({route:'LOGIN'}))
	}
	render(){
		switch(this.state.route){
			case 'LOGIN':
				let message;
				if(this.props.message.length > 0){
					message = this.props.message
				}

				return(
					<div class="card-placer">
					<div class="login-card"> 
						<h1>Login Page here</h1>
						<div>
							{message}
						</div>
						<div>
							<input ref="uname" className="input-set margin" type="text" name="userName" placeholder="User Name"/>
						</div>
						
						<div>
							<input ref="password" className="input-set margin" type="password" name="password" placeholder="password"/>
						</div>
						<div>
							<button className="submitButton margin" name="submit" onClick={this.sendCredentials}>SUBMIT</button>
						</div>
						<div>
							<button onClick={this.registerForm}> Create a new account </button>
						</div>
					</div>
					</div>
					)		
			break;
			case 'REGISTER':
			return(<div class="card-placer">
					<div class="login-card"> 
						<h1>REGISTER</h1>
						<div>
							{message}
						</div>
						<div>
							<input ref="runame" className="input-set margin" type="text" placeholder="User Name"/>
						</div>
						<div>
							<input ref="rfirstname" className="input-set margin" type="text" name="userName" placeholder="First Name"/>
						</div>
						<div>
							<input ref="rlastname" className="input-set margin" type="text" name="userName" placeholder="Last Name"/>
						</div>
						<div>
							<input ref="remail" className="input-set margin" type="email" name="userName" placeholder="Email"/>
						</div>
						<div>
							<input ref="rpassword" className="input-set margin" type="password" placeholder="Confirm Password"/>
						</div>
						<div>
							<button className="submitButton margin" name="submit" onClick={this.sendAccountData}>CREATE ACCOUNT</button>
						</div>
						<div>
							<button onClick={this.loginForm}> Already have an account? </button>
						</div>
					</div>
					</div>);
			break;
			default:
			return(0);
			break;
		}
		
	}
}
export default Login;
