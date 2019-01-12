import React from 'react';
import Card from './Card';
import { cardList } from './CardList';
import './DisplayCards.css';
const displayCards = () =>{
	return(
		<div class="arrange-cards">
			{cardList.map( (card) =>
					<Card 
						name={card.title}	
					/>
				)
			}
		</div>
		);
}

export default displayCards; 