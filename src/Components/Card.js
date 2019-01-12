import React from 'react';
import './Card.css';
const card = (props) => {

			return(		<button value={props.name} onClick={props.buttonPressed}>
						<div className="card-layout">
							<div className="image-style">
								<img  /*alt="can't display ${props.name}"*/ src='../Toyota.png'/>
							</div>
							<div className="content-style">
								<h3>{props.name}</h3>
								 <div className="checkbox">
								 	Add to Favorite <input type="checkBox" id="favoriteCheckBox" name="favorite" />
									Add to cart     <input type="checkBox" id="cartCheckBox" name="addToCart" /> 
								 </div>
							</div>
						</div>
						</button>
					)}
export default card;