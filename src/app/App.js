
import React, { Component } from 'react';

/*componentes*/
import Header from '../Global/Header';
import Content from '../Global/Content';
/*import Footer from '../Global/Footer';*/
 

class App extends Component {

	
 
	render() {
		return ( 
<div> 
{/*this is the navigation*/}
	<Header/> 
{/*this is the content */}
	<Content/>
	
</div>

			
		)	
	}
}


export default App; 