import React, { Component } from 'react';
import { cardList } from '../Components/CardList';
import Header from '../Components/Header';
import SideDrawer from '../Components/SideDrawer';
import DisplayCards from './DisplayCards';
import ErrorMessageBar from '../Components/ErrorMessageBar'
class App extends Component {
  
  filteredCardList;
  constructor(){
    super();
    this.state ={
                sideDrawerOpen: false,
                searchValue: '',
                route: 'HOME'
          }; 
  }

  searchCards = () => {
      this.filteredCardList = cardList.filter(card =>{
      return card.title.toLowerCase().includes(this.state.searchValue.toLowerCase());
      }) 
  }
  favoriteCards = () => {
      this.filteredCardList = cardList.filter(card =>{
      return card.cart;
      }) 
  }
	showSideBar = () =>{
		this.setState((prev) => {
			return({sideDrawerOpen: !prev.sideDrawerOpen});
		})
	}
  searchValueChanged=(event)=>{  
    const temp = event.target.value;
    this.setState((prev)=>({searchValue: temp, route:'SEARCH'}))
  }
  homePressed = () =>{
    this.setState((prev)=>({route:'HOME'}));
    this.filterCardList = cardList;
  }
   favoritePressed = () =>{
    console.log('Favorite pressed');
    this.setState((prev)=>({route:'FAVORITE'}));
  }

  render() {
     let errorMessageBar;
    switch(this.state.route)
    {
      case 'HOME':
      console.log('In HOME acse')
      this.filteredCardList = cardList;
      break;

      case 'SEARCH':
      this.searchCards();
        if(this.filteredCardList.length === 0){
            this.filteredCardList = cardList;
            errorMessageBar = <ErrorMessageBar errorMessage={`No Results found for ${this.state.searchValue}`}/>
        }
      break;

      case 'FAVORITE':
        this.favoriteCards();
        if(this.filteredCardList.length === 0){
            this.filteredCardList = cardList;
            errorMessageBar = <ErrorMessageBar errorMessage={`You do not have favorite items`}/>
        }
      break;

      default:
      break;
    }
    

    return (
            <div className="App">
                 <Header  showSB={this.showSideBar}
                          searchValueChanged={this.searchValueChanged} 
                          favoritePressed={this.favoritePressed}
                          homePressed={this.homePressed}

                 />
                 {errorMessageBar}
                 <SideDrawer showSideBar={this.state.sideDrawerOpen}/>
                 <DisplayCards
                        cardList={this.filteredCardList}
                        buttonPressed={this.buttonPressed} 
                        cartList={this.state.cartList}
                  />
            </div>
            );
  }
}

export default App;
