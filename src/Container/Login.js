import React,  { Component} from 'react';
import App from './App';
import './Login.css';

class Login extends Component{
		
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
								age: data.age,
								gender: data.gender
							}
							fetch('http://localhost:4000/getCards', {
								method: 'post',
								headers: {'Content-Type':'application/json'},
								body: JSON.stringify({number:123})
							})
							.then(res => res.json())
							.then(data => {
								data.map((car) => 
									{
										console.log("Car Title: ", data.title)
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
	render(){
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
					<button className="submitButton margin" name="submimt" onClick={this.sendCredentials}>SUBMIT</button>
				</div>
			</div>
			</div>
			)		
	}
}

export default Login;