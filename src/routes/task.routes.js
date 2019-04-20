//aqui van las rutas que tienen que ver con las tareas
// vamos a crear rutas para eliminar, agregar, modificar tareas 

const express = require('express');
const router = express.Router(); 


//requerimos el modelo tareas, en donde esta todas las caracteristicas de las tareas 


const Task = require('../models/task');


//respondemos con una ruta 
//cada vez que llegue una peticion a la ruta incial del servidor 
// respondemos 



// aqui respondemos con un json con las tareas 
// que tenemos en DB 
/*router.get('/',(req, res) => {
	res.send('Hello World');
});
*/



// aqui respondemos con un json con las tareas 
// que tenemos en DB 
router.get('/', async (req, res) => {
	const tasks = await Task.find();
	console.log(tasks); 
	/*res.json('Received');*/
	res.json(tasks);
});
//ruta para buscar una tarea 
// metodo get con un ID en el URL 
//findById 

router.get('/:id', async (req, res) => {
	const task = await Task.findById(req.params.id);
	res.json(task);
});


//ruta para crear una tarea 
//metodo post 

router.post('/', async (req, res) => {
	const { title, description } = req.body;
	const task = new Task({title, description});
	await task.save();
    console.log(task);
	res.json({status:  'Task Saved'});
});

  // actualizar tarea
  //metodo put 
  //findByIdAndUpdate
  router.put('/:id', async (req, res) => {
  	const { title, description } = req.body; //obtenemos estos datos del cliente 
  	const newTask = {title, description}; // a partir de esos datos creamos una nueva tarea
  	await Task.findByIdAndUpdate(req.params.id, newTask);
  	/*console.log(req.params.id);*/
    res.json({status: 'Task Updated'});

  });

  // eliminar tarea 
  // metodo delete
  //findByIdAndRemove 
  router.delete('/:id', async (req, res) => {
  	await Task.findByIdAndRemove(req.params.id);
 	res.json({status: 'Task Deleted'});
  }); 

module.exports = router;