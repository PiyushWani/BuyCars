import React, { Component } from 'react';
import Header from '../Components/Header';
import SideDrawer from '../Components/SideDrawer';
import DisplayCards from './DisplayCards';
import ErrorMessageBar from '../Components/ErrorMessageBar';
import { cartItemList } from '../Components/cartItemList';
import Login from './Login';
import MyCart from './MyCart';

class App extends Component {  

  filteredCardList;
  cardList;
  cartList;
  constructor(){
    super();
    this.state={
                refresh: true,
                sideDrawerOpen: false,
                searchValue: '',
                route: 'FETCH'
          }; 
  }
  //===================================STATE SETTERS=========================================
	showSideBar=()=>{
		this.setState((prev) => {
			return({sideDrawerOpen: !prev.sideDrawerOpen});
		})
	}

  searchValueChanged=(event)=>{  
    const temp=event.target.value;
    this.setState((prev)=>({searchValue: temp, route:'SEARCH'}))
  }

  homePressed=() =>{
    this.setState((prev)=>({route:'FETCH'}));
    this.filterCardList=this.cardList;
  }

   favoritePressed=()=>{

    this.setState((prev)=>({route:'FAVORITE'}));
  }

  cartPressed=()=>{
     this.setState((prev)=>({route:'MYCART'}));
  }
  dropdownChanged=(event)=>{
    let choice=event.target.value;
    console.log("Dropdown Choice: "+choice);
    switch(choice){
      case 'LOGOUT':
         this.props.logoutPressed();
      break;
      case 'MYACCOUNT':
      break;
      case 'MYORDERS':
      break;
      case 'MANAGEPAY':
      break;
      default:
        this.props.logoutPressed();
      break;
    }
  }

  //==========================================================================================
  //===================================Content Manipulators===================================
  searchCards = () => {
      this.filteredCardList = this.cardList.filter(card =>{
      return card.TITLE.toLowerCase().includes(this.state.searchValue.toLowerCase());
      }) 
  }

  favoriteCards = () => {
      this.filteredCardList = this.cardList.filter(card =>{
        console.log("Cart: ",card.cart)
      return card.cart;
      }) 
  }
  getCards=()=>{
    fetch('http://localhost:4000/getCards',{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({customerid:this.props.profile.customerid})
              })
              .then(res => res.json())
              .then(data => {
                data.map((car) => 
                  {
                    console.log("Car Titles ", car.TITLE)
                  })
                this.cardList=data;
                this.setState((prev)=>({route:'HOME'}))
              })
    }
  //==========================================================================================
  render() {
    console.log("this.props.profile: ", this.props.profile)
    let errorMessageBar;
    let myCart;
    let displayCards;
    let login;
    let header = <Header  showSB={this.showSideBar}
                          searchValueChanged={this.searchValueChanged} 
                          favoritePressed={this.favoritePressed}
                          homePressed={this.homePressed}
                          cartPressed={this.cartPressed}
                          dropdownChanged={this.dropdownChanged}
                 />;
    let sideDrawer;

    switch(this.state.route)
    {
      case 'FETCH':
      console.log("In fetch route")
        this.getCards();
        return(<div> Fetching Data </div>);
      break;
      case 'HOME':
      this.filteredCardList= this.cardList;
      displayCards = <DisplayCards
                        cardList={this.filteredCardList}
                        buttonPressed={this.buttonPressed} 
                        cartList={this.state.cartList}
                         profile={this.props.profile}
                  />
      sideDrawer = <SideDrawer showSideBar={this.state.sideDrawerOpen}/>
      break;
      case 'SEARCH':
      this.searchCards();
        if(this.filteredCardList.length === 0){
            this.filteredCardList = this.cardList;
            errorMessageBar = <ErrorMessageBar errorMessage={`No Results found for ${this.state.searchValue}`}/>
        }
      displayCards = <DisplayCards
                        cardList={this.filteredCardList}
                        buttonPressed={this.buttonPressed} 
                        cartList={this.state.cartList}
                        profile={this.props.profile}
                      />
      sideDrawer = <SideDrawer showSideBar={this.state.sideDrawerOpen}/>
      break;
      case 'FAVORITE':
        this.favoriteCards();
        if(this.filteredCardList.length === 0){
            this.filteredCardList = this.cardList;
            errorMessageBar = <ErrorMessageBar errorMessage={`You do not have favorite items`}/>
        }
        displayCards = <DisplayCards
                        cardList={this.filteredCardList}
                        buttonPressed={this.buttonPressed}
                        cartList={this.state.cartList}
                        profile={this.props.profile}
                  />
        sideDrawer = <SideDrawer showSideBar={this.state.sideDrawerOpen}/>    
      break;

      case 'MYCART':
        myCart = <MyCart  profile={this.props.profile}
                />
      break;
      default:
        //LOgout
      break;
    }
    
    return (
            <div className="App">
                 {header}
                 {login}
                 {errorMessageBar}
                 {sideDrawer}
                 {displayCards}
                 {myCart}
            </div>
            );
  }
}

export default App;
