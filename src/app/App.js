
import React, { Component } from 'react';


class App extends Component {

	constructor() {
		super(); //heredamos todas las funcionalidades del componente react
		this.state = { //con esto decimos que cuando empiece la aplicacion todos los datos en blanco 
			title: '',
			description: '',
			tasks: [],
			_id: ''
		};
		this.addTask = this.addTask.bind(this);
		this.handleChangue = this.handleChangue.bind(this);
	}
/*esta funcion nos permite tomar la info de cuanto ingresamos una tarea*/
/*y hace que lo reenvie a la direccion que tenemos de api */
// en este caso api tasks 
// de esta forma hacemos un evento de guardado 																		
addTask(e) {
	// si desde el estado estamos obteniendo un ID tenemos que hacer una actualizacion. EDIT 
	if(this.state._id){
		fetch(`/api/tasks/${this.state._id}`, {
			method	: 'PUT', 	//metodo PUT porue es un EDIT 
			body : JSON.stringify(this.state),
			headers: {
			//de esta forma expresamos que el tipo de contenido es de un formato json 

			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}

		})
//cuando lo tenga voy a convertir esa respuesta en formato JSON 
.then(res => res.json())
.then(data => {

	console.log(data);
	M.toast({html: 'actividad editada'});
	//hacemos que todo vuelva a en blanco para que se muestre bien 
	//para que el ID quede en blanco nuevamente y se pueda distinguir cuando se hace un EDIT o un ADD 
	this.setState({title: '', description:'', _id:''}); 
	this.fetchTasks();
});
  
//si por lo contrario no estoy recibiendo un ID vamos a guardar los datos porque es un ingreso nuevo. ADD
	}else {
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
		M.toast({html: 'Actividad registrada'});
		//de esta forma limpiamos 
		this.setState({title: '', description: '' });
		this.fetchTasks();
	})
	.catch(err => console.error(err));
/*
	console.log(this.state);*/

	}
	e.preventDefault();
}

//llamamos a este componente para que busque todas las tareas justo cuando cargue la aplicacion
componentDidMount() {
	this.fetchTasks();
}

fetchTasks(){ // esto es lo que ejecutamos para actualizar la lista
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
	if(confirm('Estas seguro que deseas eliminar esta actividad?')){


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
	.then(data => {
		console.log(data);
		//llamamos a una variable global de Materialize que nos permite mostrar mensajes por pantalla 
		M.toast({html: 'Actividad Eliminada'});
		this.fetchTasks();
});
}}

editTask(id){

	fetch(`/api/tasks/${id}`)
	// cuando me responda el servidor la converitmos en formato json 
	.then(res => res.json())
	//luego quiero que me muestre por consola lo que he obtenido 
	.then(data => {

		console.log(data)
		this.setState({
			title: data.title,
			description: data.description,
			_id: data._id
		})
		});
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
			<div className="row">				{/*aqui agregamos las tareas */}
				<div className="col s4"> {/*detalles del margen y tamano*/}

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
																	{/*aqui mostramos las tareas */}
				<div className="col s8"  style ={{margin: '0px'}}> {/*detalles del margen y tamano*/}
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
														<button onClick	={() => this.editTask(task._id) } className = "btn light-green darken-6" style ={{margin: '4px'}}>
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