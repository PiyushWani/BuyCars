import React, { Component } from 'react';
import { cardList } from '../Components/CardList';
import Header from '../Components/Header';
import SideDrawer from '../Components/SideDrawer';
import DisplayCards from '../Components/DisplayCards';
import ErrorMessageBar from '../Components/ErrorMessageBar'
class App extends Component {
 tempList = [];
  constructor(){
    super();
    this.state ={
          sideDrawerOpen: false,
          cartList: [],
          searchValue: ''
          }; 
  }
	showSideBar = () =>
	{
		this.setState((prev) => {
			return({sideDrawerOpen: !prev.sideDrawerOpen});
		})
		console.log(`Burger Pressed ${this.state.sideDrawerOpen}`);
	}

  buttonPressed = (event) =>{
    console.log(`Add to cart pressed: ${event.target.value}`);
    this.tempList.push(event.target.value);
    this.setState({cartList: this.tempList});
    console.log('CartList: '+this.state.cartList);
  }

  searchValueChanged = (event) =>{
    this.setState({searchValue: event.target.value})
  }

  render() {
    let errorMessageBar;
    let filteredCardList = cardList.filter(card =>{
      return card.title.toLowerCase().includes(this.state.searchValue.toLowerCase());
      })
    if(filteredCardList.length === 0){
        filteredCardList = cardList;
        errorMessageBar = <ErrorMessageBar errorMessage={`No Results found for ${this.state.searchValue}`}/>
    }
    return (
      <div className="App">
         <Header  showSB={this.showSideBar}
                  searchValueChanged={this.searchValueChanged} 
         />
         {errorMessageBar}
         <SideDrawer showSideBar={this.state.sideDrawerOpen}/>
         <DisplayCards 
                cardList={filteredCardList}
                buttonPressed={this.buttonPressed} 
                cartList={this.state.cartList}
          />
      </div>
    );
  }
}

export default App;
