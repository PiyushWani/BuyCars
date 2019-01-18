import React, { Component} from 'react';
import './Dropdown.css';

const Dropdown = ({caption, list, dropdownChanged}) =>
{
			return(
			<p>
             <select className="cart-dropdown" onChange={dropdownChanged}>
               <option value = "MYACCOUNT">{caption}</option>
               <option value = "MYORDERS">My Orders</option>
               <option value = "MANAGEPAY">Manage Pay</option>
               <option value = "LOGOUT">Logout</option>
             </select>
          </p>

				)	
					
	
}
export default Dropdown;