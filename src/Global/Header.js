import React, { Component } from 'react';
/*import logo from './images/logo.svg';*/
/*import './css/Header.css'; */

class Header extends Component { 
render (){

	return ( 
		<div className = "Header">
		 		<div className = "Logo"> 
						<nav className="light-blue darken-4">
								<div className="container">
									<a className="brand-logo" href="/"> gestion de actividades </a>	
								</div> 
						</nav>
		 		 </div> 
	    </div> 
	    );
	}
}

export default Header; 