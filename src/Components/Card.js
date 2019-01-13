import React from 'react';
import './Card.css';
import AddButton from './AddButton';
const card = ({card, buttonPressed, cardStatus}) => {
			
			return(		
						<div className="card-layout grow">
							<div className="image-style">
								<img  /*alt="can't display ${props.name}"*/ src='../Toyota.png'/>
							</div>
							<div className="content-style">
								<h3>{card.title}</h3>
								 <div>
								 	<AddButton card={card} buttonPressed={buttonPressed} cardStatus={cardStatus}/>
								 </div>
							</div>
						</div>
					)}
export default card;
/*
tc bg-light-green dib br3 pa3 ma3 grow*/