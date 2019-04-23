
import React, { Component } from 'react';


class App extends Component {

	constructor() {
		super(); //heredamos todas las funcionalidades del componente react
		this.state = { //con esto decimos que cuando empiece la aplicacion todos los datos en blanco 
			title: '',
			description: '',
			tasks: []
		};
		this.addTask = this.addTask.bind(this);
		this.handleChangue = this.handleChangue.bind(this);
	}
/*esta funcion nos permite tomar la info de cuanto ingresamos una tarea*/
/*y hace que lo reenvie a la direccion que tenemos de api */
// en este caso api tasks 
// de esta forma hacemos un evento de guardado 																		
addTask(e) {
	fetch('/api/tasks', {
		method: 'POST',
		body: JSON.stringify(this.state),
		headers: {
			//de esta forma expresamos que el tipo de contenido es de un formato json 

			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})

	.then(res => res.json())
	.then(data => {

		console.log(data)
		//llamamos a una variable global de Materialize que nos permite mostrar mensajes por pantalla 
		M.toast({html: 'Task Saved'});
		//de esta forma limpiamos 
		this.setState({title: '', description: '' });
		this.fetchTasks();
	})
	.catch(err => console.error(err));
/*
	console.log(this.state);*/
	e.preventDefault();
}

//llamamos a este componente para que busque todas las tareas justo cuando cargue la aplicacion
componentDidMount() {
	this.fetchTasks();
}

fetchTasks(){
	//aqui no es necesario definir el metodo de la peticion si es GET/POST
	//como en addTask ya que por default se envia en GET 

	fetch('/api/tasks')	
	.then(res => res.json())

	.then(data => {

		/*console.log(data);	*/
		this.setState({tasks: data});
		console.log(this.state.tasks);

		});
}

deleteTask(id){
	console.log('deleting', id);
	//concatenamos 				
	/*fetch('/api/tasks/' + id)*/
	//otra forma de concatenar 
	fetch(`/api/tasks/${id}`, {

		method: 'DELETE',
		headers: {
			//de esta forma expresamos que el tipo de contenido es de un formato json 

			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
	.then(res => res.json())
	.then(data => console.log(data));	
		this.fetchTasks();
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
			<a className="brand-logo" href="/"> gestion de actividades </a>	
		</div> 
	</nav>
	<div className="container">
		<div className="row">
			<div className="row">
				<div className="col s5">

					<div className="card">
					<nav className="light-green	darken-6">
						<div className="container">
							<div> Agregar Actividad  </div>	
						</div> 
						</nav>
						<div className="card-content ">
							<form onSubmit={this.addTask}>
								<div className="row">
									<div className="input-fiel">
									<input name="title" onChange={this.handleChangue} type="text" 
									placeholder="Titulo de Actividad" value= {this.state.title} />
									</div>
								</div>
								<div className="row">
									<div className="input-fiel">
										<textarea name="description" onChange={this.handleChangue} placeholder="Descripcion"
												  className="materialize-textarea" value= {this.state.description}>
										</textarea>
									</div>
								</div>
								<button type="submit" className="btn light-green	darken-6">
									    Send
								</button>
							</form >
						</div>
					</div>
				</div>
			{/*aqui mos tramos las tareas */}
				<div className="col s7">
						<table>
								<thead> 
										<tr>
												<th>Titulo</th> 
												<th>Descripcion</th> 
										</tr> 
								</thead>
								<tbody>
										{ //aqui mapeamos todas las actividades para ser mostradas 
											this.state.tasks.map(task => {
												return (
												<tr key={task._id}>
													<td>{task.title}</td> 
													<td>{task.description}</td> 
													<td>
														<button className = "btn light-red	darken-4">
														<i className = "material-icons" onClick={() => this.deleteTask(task._id	)}> delete</i>
														</button>
														<button className = "btn light-green darken-6" style ={{margin: '4px'}}>
														<i className = "material-icons"> edit </i>
														</button>
													</td>
												</tr>
													)
											})
										}

								</tbody> 
						</table>
			    </div>
			</div>
		</div>
	</div>
</div>
			
		)	
	}
}


export default App; 