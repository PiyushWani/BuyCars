import React from 'react';
import './Card.css';
const card = (props) => {

			return(		
						<div className="card-layout">
							<div className="image-style">
								<img  /*alt="can't display ${props.name}"*/ src='../Toyota.png'/>
							</div>
							<div className="content-style">
								<h3>{props.name}</h3>
								 <div >
								 	<input className="button-style" type="button" name="favorite" value="Add to Cart"/>
								 </div>
							</div>
						</div>
						
					)}
export default card;