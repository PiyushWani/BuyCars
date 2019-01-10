import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import SideDrawer from './SideDrawer';
class App extends Component {
	
		state= {sideDrawerOpen: false}; 
	
	showSideBar = () =>
	{
		this.setState((prev) => {
			return({sideDrawerOpen: !prev.sideDrawerOpen});
		})
		console.log(`Burger Pressed ${this.state.sideDrawerOpen}`);
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
      </div>
    );
  }
}

export default App;
