//aqui van las rutas que tienen que ver con las tareas
// vamos a crear rutas para eliminar, agregar, modificar tareas 

const express = require('express');
const router = express.Router(); 

//respondemos con una ruta metodo get 
//cada vez que llegue una peticion a la ruta incial del servidor 
// respondemos con un hola mundo
router.get('/',(req, res) => {
	res.send('Hello World');
});

module.exports = router;