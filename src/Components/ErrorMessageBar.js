import React from 'react';
import './ErrorMessageBar.css';

const ErrorMessageBar = ({errorMessage}) => 
			{
				console.log('errorMessage: '+errorMessage)
		return(		<div className="error-bar">	
						<div className="error-message"> {errorMessage}</div>
					</div>	
			);
		}
export default ErrorMessageBar