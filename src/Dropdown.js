import React, { Component} from 'react';
import './Dropdown.css';

class Dropdown extends Component
{
	constructor()
	{
		super();
		this.state = {roll:false};
	}
	rollDown = () =>{
		
		console.log(`Mouse over dropDown. Roll: ${this.state.roll}`);	
		this.setState({roll:true});
	}
	rollUp = () =>{
		
		console.log(`Mouse off the dropDown. Roll: ${this.state.roll}`);
		this.setState({roll:false});
	}
	render(){
		

		if(this.state.roll)
		{
			return(
				<div className="dropdown">
				  <button 
					onMouseOver={this.rollDown}
					onMouseOut={this.rollUp}
					className="my-cart button" 
					name="myCart"> 
						My Cart 
					</button>
					<div className="dropdown-content">
					    <span><a href="#">Link 1</a></span>
					    <span><a href="#">Link 2</a></span>
					    <span><a href="#">Link 3</a></span>
				    </div>
				</div>
				
				)	
		}
		else
		{
			return(
				<div className="dropdown">
					<button 
					onMouseOver={this.rollDown}
					onMouseOut={this.rollUp}
					className="my-cart button" 
					name="myCart"> 
						My Cart 
					</button>
				</div>
			);
		}
			
	}
}
export default Dropdown;