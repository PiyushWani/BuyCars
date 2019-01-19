import React, {Component} from 'react';
import './Card.css';
import AddButton from './AddButton';
class Card extends Component{
	constructor(){
		super();
		this.state = {
			add:false
		}
	}
	addItem = (event) =>{
			    this.props.card.cart = true;
			    this.setState((prev)=>({add:true}));
	}
	removeItem = (event) =>{
	    this.props.card.cart = false;
	    this.setState((prev)=>({add:false}));
	}

	render(){
		return(			<div className="card-layout grow">
								<div className="image-style">
									<img src="http://placekitten.com/g/300/300" alt="kitten"/>
								</div>
								<div className="product-description">
								 <div className="title">{this.props.card.TITLE} </div>
								 <div className="price">${this.props.card.PRICE}</div>
								</div> 
								 <div className="add-button">
									 <AddButton card={this.props.card} addItem={this.addItem} removeItem={this.removeItem} cardStatus={this.props.cardStatus}/>
								 </div>
						</div>
					);

	}
}		
export default Card;
/*
tc bg-light-green dib br3 pa3 ma3 grow*/