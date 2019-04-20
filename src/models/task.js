// aqui es donde definimos como van a lucir las tareas

const mongoose = require('mongoose'); 
//es el esquema donde definimos las caracteristicas de una tarea 
// y con moongose nos comunicamos a DB 
const { Schema } = mongoose; 

const TaskSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true}
	});

//task es como vamos a poder reutulizar los datos dentro de la pp 
// taskschema es como lucen estos dados 

module.exports = mongoose.model('Task' , TaskSchema); 
