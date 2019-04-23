
import React, { Component } from 'react';


class App extends Component {

	constructor() {
		super(); //heredamos todas las funcionalidades del componente react
		this.state = {
			title: '',
			description: ''
		};
		this.addTask = this.addTask.bind(this);
		this.handleChangue = this.handleChangue.bind(this);
	}
/*esta funcion nos permite tomar la info de cuanto ingresamos una tarea*/
/*es llamada en los formularios*/
addTask(e) {
	console.log(this.state);
	e.preventDefault();
}

/*esta funcion nos permite capturar los cambios que estamos ingresando */
/*de aqui tomamos la data y la separamos*/
/*es nombrada en los inputs */
handleChangue(e) {
	/*console.log(e.target.name);*/
	const { name, value } = e.target; 
	this.setState({
		[name]: value
	});

}
 
	render() {
		return ( 
<div> 
{/*this is the navigation*/}
	<nav className="light-blue darken-4">
		<div className="container">
			<a className="brand-logo" href="/"> Dai ko myo  </a>	
		</div> 
	</nav>
	<div className="container">
		<div className="row">
			<div className="row">
				<div className="col s5">
					<div className="card">
						<div className="card-content">
							<form onSubmit={this.addTask}>
								<div className="row">
									<div className="input-fiel">
									<input name="title" onChange={this.handleChangue} type="text" placeholder="title"/>
									</div>
								</div>
								<div className="row">
									<div className="input-fiel">
										<textarea name="description" onChange={this.handleChangue} placeholder="Description"
												  className="materialize-textarea">
										</textarea>
									</div>
								</div>
								<button type="submit" className="btn light-blue darken-4">
									    Send
								</button>
							</form >
						</div>
					</div>
				</div>
				<div className="col s7">

			    </div>
			</div>
		</div>
	</div>
</div>
			
		)	
	}
}


export default App; 