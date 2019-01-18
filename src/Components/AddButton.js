import React from 'react';
import './AddButton.css';
const AddButton = ({card, addItem, removeItem}) =>
	{
		let addButton = <button className="button-style" 
								type="button" 
								value={card.title} 
								onClick={addItem}>
							Add to cart
						</button>
		if(card.cart === true)	{
			addButton = <button 
								className="button-style green" 
								type="button" 
								value={card.title} 
								onClick={removeItem}>
							Added
						</button>
		}	
		return(
				<div>
					{addButton}
				</div>
			);

	}
export default AddButton;