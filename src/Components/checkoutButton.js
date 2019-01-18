import React from 'react';
import './checkoutButton.css';
const CheckoutButton = (props) =>{
	console.log("Checkout called")
	return(
		<div>
			<button className="checkout-button">Check out ${props.totalAmount}</button>
		</div>
		);
}
export default CheckoutButton;