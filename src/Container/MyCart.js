import React, { Component } from 'react';
import CartItem from '../Components/CartItem';
import './MyCart.css';
import CheckoutButton from '../Components/checkoutButton';
class MyCart extends Component
{
	totalAmount=0;
	cartItems=[]
	constructor(){
		super();
		this.state = {
			refresh: false,
			mode: 'FETCH'
		}
	}
	
	calculatePrice = (price, quantity=1) =>{
		this.totalAmount = this.totalAmount + (quantity * price);
	}

	getCartItems=()=>{
    fetch('http://localhost:4000/getCartItems', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({customerid:this.props.profile.customerid})
    })
    .then(response=> response.json())
    .then(data=>{
        console.log("CartItems: ",data)
        this.cartItems = data;
        this.setState((prev)=>({mode:'DISPLAY'}))
    })
    .catch(exception=>{alert(exception)});
  	}

	quantityChanged=(event)=>{
			const qTemp = event.target.value;
			console.log("QuantityChanged: "+qTemp);	
			let splits = qTemp.split("_");
			this.totalAmount=0;
			this.cartItems.map((item) => {
				if(splits[0] === item.TITLE){
					item.QUANTITY = splits[1];
				}
			})
			this.setState((prev)=>({refresh:true}));		
	}
	removePressed=(event)=>{
		const itemid= event.target.value;
		console.log("Remove pressed- ",itemid,"/",this.props.profile.customerid);
		fetch('http://localhost:4000/removeFromCart', {
			method: 'post',
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify({
				itemid: itemid,
				customerid: this.props.profile.customerid
			})
		})
		.then(response=>response.json())
		.then(data=>{
			if(data.status==='SUCCESS'){
				this.setState((prev)=>({mode:"FETCH"}))
			}
		})
	}
	checkoutPressed = () =>{
		alert("Thank you for making a purchase! Amount Paid $"+this.totalAmount+".")
		//Item to be removed from cartItems and placed in orderedItems
	}
	render(){
		let display;
		let fetching;
		this.totalAmount=0;
		switch(this.state.mode)
		{
			case 'FETCH':
				this.getCartItems();
				return(<div> Fetching Data </div>);
			break;
			case 'DISPLAY':
			return(
				 <div>
								<div className="cart-container">	
									<div className="cart-item">
										{
											this.cartItems.map((item) => {
												this.calculatePrice(item.PRICE, item.QUANTITY);
												return(<CartItem item={item} quantityChanged={this.quantityChanged} removePressed={this.removePressed}/>)
											})
										}
									</div>	
								</div>
								<div className="checkout-place">
									<div>
										<button className="checkout-button" onClick={this.checkoutPressed}>Check-out ${this.totalAmount}</button>
									</div>
								</div>
							</div>
					);
			break;
			default:
			return(<div> Default mode in MyCart.js</div>);
			break;
		}	
	}
}

export default MyCart;