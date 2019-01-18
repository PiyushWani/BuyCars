import React, { Component } from 'react';
import Card from '../Components/Card';
import './DisplayCards.css';

class DisplayCards extends Component{
		tempList = [];	
		render()
		{
				let cardStatus= '';
				console.log(`Cart List in displayCards: ${this.cartList}`)
				return(
					<div className='container'>
					<div className="top-space">. </div>
					<div className="top-space">. </div>
					<div className="top-space">. </div>
					<div className="arrange-cards">
					{
						this.props.cardList.map( (card) =>
												{
													console.log("Card: "+card.title);
													return(
														<div>
														<Card card={card} 
														 />
													  	</div>
													  )
												}
											)
					}
					</div>
					</div>
					);
		}

} 

export default DisplayCards; 
