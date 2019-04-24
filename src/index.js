//este es el punto de entrada de webpack 
//aqui va el codigo de nuestro servidor nodeJS hecho en express
//inicializamos 
/**/


/*constantes*/
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database');

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
app.use('/api/users' ,require('./routes/user.routes'));
app.use('/api/tasks' ,require('./routes/task.routes'));

//statics files
//con la funcion path, unimos dirname con la carpeta public
// de esta forma encontramos la ruta hasta public
// que remos llegar hasta el archivo HTML que esta en public 
// en ese archivo despues de llama a la aplicacion react
app.use(express.static(path.join(__dirname, 'public')));

//starting the server 

app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
});

