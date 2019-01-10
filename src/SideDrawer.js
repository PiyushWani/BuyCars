import React from 'react';
import './SideDrawer.css';
import DrawerButton from './DrawerButton';
const SideDrawer = props =>{	
							let classCSS = ["side-drawer"];
							console.log(`showSideBar: ${props.showSideBar}`)
							if(props.showSideBar)
							{
								classCSS.push("show-sidebar");
							}
							console.log(`classCSS: ${classCSS}`);						
							return(
								<nav className={classCSS.join(' ')}>
									<div className='list-title'>Tools</div>
									<ul className="item-list">
										<li className="item"> <a className="anchor" href="#">Item 1</a></li>
										<li className="item"> <a className="anchor" href="#">Item 2</a></li>
										<li className="item"> <a className="anchor" href="#">Item 3</a></li>
										<li className="item"> <a className="anchor" href="#">Item 4</a></li>
									</ul>
								</nav>
							);
						};
export default SideDrawer;