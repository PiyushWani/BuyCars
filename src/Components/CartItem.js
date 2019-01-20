import React, { Component } from 'react';
import './CartItem.css';
class CartItem extends Component{

		item = this.props.item;
		
		render(){
			return(
			<div className="cart-item2">
				<img className="cart-image" alt="image" src="http://placekitten.com/g/300/300"/>
				<div className="cart-item-desc">
					<div>
						Model: {this.item.TITLE}
					</div>
					<div>
						Manufacturer: {this.item.MANUFACTURER}
					</div>
					<div>
						Price: ${this.item.PRICE}
					</div>
					<div>
						Address: 187 Kenmore, Buffalo, New York 
					</div>
				</div>
				<div className="cart-item-manip">
					<div>
						<button className="remove-button" value={this.item.ITEMID} onClick={this.props.removePressed}> Remove </button>
					</div>
					<div>
						<select className="cart-dropdown" id = "myList" onChange={this.props.quantityChanged}>
			               <option value = {`${this.item.TITLE}_0`}>Buy Later</option>
			               <option value = {`${this.item.TITLE}_1`} selected>1</option>
			               <option value = {`${this.item.TITLE}_2`}>2</option>
			             </select>
					</div>
				</div>
			</div>
		);

		}
		
} 


export default CartItem;