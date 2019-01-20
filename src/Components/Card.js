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
				console.log("addItem 1");
				console.log("profile info: ", this.props.profile)
				console.log("card info: ", this.props.card)
				fetch('http://localhost:4000/addToCart',{
					method: 'post',
					headers: {'Content-Type':'application/json'},
					body: JSON.stringify({
						customerid: this.props.profile.customerid,
						itemid: this.props.card.ITEMID,
						qauntity: 1
					})
				})
				.then(res => res.json())
				.then(res2=>{
					console.log("addItem 2");
					if(res2.status==='SUCCESS'){
						this.props.card.cart = true;
			    		this.setState((prev)=>({add:true}));
					}
					else{
						alert("could not add card to cart")
					}
				})
			    
	}
	removeItem = (event) =>{
		console.log("addItem 1");
				console.log("profile info: ", this.props.profile);
				console.log("card info: ", this.props.card);
				fetch('http://localhost:4000/removeFromCart',{
					method: 'post',
					headers: {'Content-Type':'application/json'},
					body: JSON.stringify({
						customerid: this.props.profile.customerid,
						itemid: this.props.card.ITEMID,
						qauntity: 1
					})
				})
				.then(res => res.json())
				.then(res2=>{
					console.log("addItem 2");
					if(res2.status==='SUCCESS'){
						this.props.card.cart = false;
			    		this.setState((prev)=>({add:false}));
					}
					else{
						alert("could not remove card from cart")
					}
				})
	}

	render(){
		return(			<div className="card-layout grow">
								<div className="image-style">
									<img src="http://placekitten.com/g/300/300" alt="kitten"/>
								</div>
								<div className="product-description">
								 <div className="title">{this.props.card.TITLE}</div>
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