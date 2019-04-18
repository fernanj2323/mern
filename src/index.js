//aqui va el codigo de nuestro servidor nodeJS hecho en express

//inicializamos 

const express = require('express');
const app = express();
const morgan = require('morgan');
//settings
//toma el puerto que esta configurado en nuestra app en el sistema operativo 
//cuando desplegamos en servicios en la nube, entonces que tome automaticamente el puerto 
// que esta requiriendo el servicio de la nube, o que en su defecto tome el puerto 3000
app.set('port', process.env.PORT || 3000);


//midlewares 
//deben ejecutarse antes de las rutas 
//morgan nos dice informacion de cada requerimiento que le hacen al servidor
app.use(morgan('dev'));
//cada vez que llega un dato al servidor pasa por esta funcion
//en caso de que la fuincion este en formato Json. 
//nosotros vamos a poder acceder a el desde nuestro codigo del servidor 
// y de la misma manera vamos a poder enviar datos en formato json. 
app.use(express.json());

//routes
app.use(require('./routes/task.routes'));

//statics files


//starting the server 

app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
});

