import React, { Component } from 'react';
import CartItem from '../Components/CartItem';
import './MyCart.css';
import CheckoutButton from '../Components/checkoutButton';
class MyCart extends Component
{
	totalAmount=0;
	constructor(){
		super();
		this.state = {
			quantityChanged: false
		}
	}
	calculatePrice = (price, quantity=1) =>{
		this.totalAmount = this.totalAmount + (quantity * price);
	}
	quantityChanged = (event) =>{
			const qTemp = event.target.value;
			console.log("QuantityChanged: "+qTemp);	
			let splits = qTemp.split("_");
			this.totalAmount=0;
			this.props.cartItemList.map((item) => {
				if(splits[0] === item.title){
					item.quantity = splits[1];
				}
			})
			this.setState((prev)=>({quantity:true}));		
	}
	checkoutPressed = () =>{
		alert("Thank you for making a purchase! Amount Paid $"+this.totalAmount+".")
		//Item to be removed from cartItems and placed in orderedItems
	}
	render(){
		this.totalAmount=0;
		return(
			<div>
				<div className="cart-container">	
					<div className="cart-item">
						{
							this.props.cartItemList.map((item) => {
								this.calculatePrice(item.price, item.quantity);
								return(<CartItem item={item} quantityChanged={this.quantityChanged}/>)
							})
						}
						
					</div>	
				</div>
				<div className="checkout-place">
					<div>
						<button className="checkout-button" onClick={this.checkoutPressed}>Check out ${this.totalAmount}</button>
					</div>
				</div>
			</div>
			);
	}
}

export default MyCart;