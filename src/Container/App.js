import React, { Component } from 'react';

import Header from '../Components/Header';
import SideDrawer from '../Components/SideDrawer';
import DisplayCards from '../Components/DisplayCards';
class App extends Component {
	
		state= {sideDrawerOpen: false}; 
	
	showSideBar = () =>
	{
		this.setState((prev) => {
			return({sideDrawerOpen: !prev.sideDrawerOpen});
		})
		console.log(`Burger Pressed ${this.state.sideDrawerOpen}`);
	}
  buttonPressed = (event) =>{
    console.log(event.target.value);
  }
  render() {
  	/*let sideDrawer;
  	if(this.state.sideDrawerOpen){
  		 sideDrawer=<SideDrawer />;
  	}*/
    return (
      <div className="App">
         <Header showSB={this.showSideBar}/> 
         <SideDrawer showSideBar={this.state.sideDrawerOpen}/>
         <DisplayCards />
         {/*<Card name={'Maruti Suzuki'} buttonPressed={this.buttonPressed}/>*/}
      </div>
    );
  }
}

export default App;
