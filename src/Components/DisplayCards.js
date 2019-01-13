import React from 'react';
import Card from './Card';

import './DisplayCards.css';
const displayCards = ({cardList, buttonPressed, cartList, searchValue}) =>{
	
	let cardStatus= '';
	console.log(`Cart List in displayCards: ${cartList}`)
	return(
		<div className='left-space'>
		<div className="top-space">. </div>
		<div className="top-space">. </div>
		<div className="top-space">. </div>
		<div className="arrange-cards">
			{cardList.map( (card) =>
							{

								cardStatus = 'FRESH';
								if(cartList.includes(card.title)){
									cardStatus = `ADDED-TO-CART`;
									console.log(`${card.title} has assigned ${cardStatus} status`)
								}
								return(
									<div>
									 <Card card={card} buttonPressed={buttonPressed} cardStatus={cardStatus}/>
								  	</div>
								  )
							}
						)
			}
		</div>
		</div>
		);
}

export default displayCards; 