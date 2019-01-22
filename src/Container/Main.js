import React, { Component } from 'react';
import Login from './Login';
import App from './App';
class MainLogin extends Component{
	userProfile;
	data;
	constructor(){
		super();
		this.state = {
			route: "LOGIN",
			profile: ''
		}	
	}
	allowHome=(profile, data) =>{
		this.userProfile=profile;
		this.data=data;
    	this.setState((prev)=>({route:'APP'}));
  	}
  	disallowHome=() =>{
    	this.setState((prev)=>({route:'LOGININCORRECT'}));
  	}
  	logoutPressed=()=>{
  		this.setState((prev)=>({route:'LOGIN'}));
  	}
	render(){
		let display=<Login />;
		switch(this.state.route)
		{
		case 'LOGIN':
	    	display = <Login 
	                    allowHome={this.allowHome}
	                    disallowHome={this.disallowHome} 
	                    message={''}
	                />
	    break;
	    case 'LOGININCORRECT':
	        display = <Login 
	                    allowHome={this.allowHome} 
	                    disallowHome={this.disallowHome} 
	                    message={'Incorrect User Name or Password'}
	                />
	    break;
	    case 'APP':
	    	console.log("APP user profile", this.userProfile)
	    	display = <App 
	    				logoutPressed={this.logoutPressed}
	    				data={this.data}
	    				profile={this.userProfile}
	    				/>
	    break;			
		default:
			display = <Login 
	                    allowHome={this.allowHome} 
	                    disallowHome={this.disallowHome} 
	                    message={'Something went wrong on our server! - Login.js'}
	                />
			break;
		}

		return(
			<div>
				{display}
			</div>
		);
	}
}
export default MainLogin;
