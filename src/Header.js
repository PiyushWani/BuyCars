import React, { Component } from 'react';
import './Header.css';
import Dropdown from './Dropdown';
import DrawerButton from './DrawerButton';
const Header = (props) =>{
		return(
			<nav className="topnav">	
						<DrawerButton showSB={props.showSB}/>
						<div className="toolbar-logo"><a className="logo" href="#">The Logo</a></div>
						<input className="search-bar" type="searchBar" name="searchField" placeholder="Search Cars"/>
						<button className="search button" name="searchButton"> Search </button>
						<button className="home button" name="home"> Home </button>
						<button className="favorite button" name="favorites"> Favorites </button>
						<Dropdown />
						<button className="logout button" name="logout"> Logout </button>
			</nav>	
		);
	}

export default Header;