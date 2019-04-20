//aqui van las rutas que tienen que ver con los usuarios
// vamos a crear rutas para eliminar, agregar, modificar usuarios 
const express = require('express');
const router = express.Router(); 



//requerimos el modelo Usuarios, en donde esta todas las caracteristicas del usuario

const User = require('../models/user');


//respondemos con una ruta 
//cada vez que llegue una peticion a la ruta incial del servidor 
// respondemos 



// aqui respondemos con un json con las tareas 
// que tenemos en DB 


router.get('/', async (req, res) => {
	const users = await User.find();
	console.log(users); 
	/*res.json('Received');*/
	res.json(users);
});

//ruta para buscar un usuario 
// metodo get con un ID en el URL 
//findById 

router.get('/:id', async (req, res) => {
	const users = await User.findById(req.params.id);
	console.log(users); 
	/*res.json('Received');*/
	res.json(users);
});

//ruta para crear un usuario 
// metodo post 
//

router.post('/' , async (req, res) => {
	const { firstName, secondName, department, rol, city, birthday} = req.body;
	const user = new User ({firstName, secondName, department, rol, city, birthday});
	await user.save();
	console.log(user);
	res.json({status: 'User Saved'});
});

//actualizar un usuario
// metodo put 
// finByIdAndUpdate 

router.put('/:id', async (req, res) => {
	//obtenemos estos datos del cliente 
	const { firstName, secondName, department, rol, city, birthday} = req.body;
	// a partir de esos datos creamos un nuevo usuario 
	const newUser = { firstName, secondName, department, rol, city, birthday};
	await User.findByIdAndUpdate(req.params.id, newUser);
	res.json({status: 'User Updated'});
});

//eliminar usuario 
// metodo delete
// findByIdAndRemove
router.delete('/:id', async (req, res) => {
	await User.findByIdAndRemove(req.params.id);
	res.json({status: 'User Deleted'});
});

module.exports = router; 