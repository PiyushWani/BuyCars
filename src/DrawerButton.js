import React from 'react';
import './DrawerButton.css';
const DrawerButton = (props) =>{
	return(
		<button className="toggle-button" onClick={props.showSB}>
				<div className="toggle-button-line"> </div>
				<div className="toggle-button-line"> </div>
				<div className="toggle-button-line"> </div>
		</button>
		);
}

export default DrawerButton;