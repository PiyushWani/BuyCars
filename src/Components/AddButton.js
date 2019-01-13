import React from 'react';
import './AddButton.css';
const AddButton = ({card, buttonPressed, cardStatus}) =>
	{
		/*console.log(`${card.title} cardStatus: ${cardStatus}`);*/
		let addButton = <button className="button-style" type="button" value={card.title} onClick={buttonPressed}>
						Add to Cart
				</button>
		if(cardStatus === 'ADDED-TO-CART')	{
			/*console.log(`car ${card.title} has been added to offClick`)*/
			addButton = <button className="button-style green" type="button" value={card.title}>
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