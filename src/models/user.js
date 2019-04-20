// aqui es donde definimos como van a lucir la entrada de usuarios
// que datos va a solicitar

//requerimos mongoose que nos permite establecer 
//comunicacion con mongoDB 
const mongoose = require('mongoose');

const { Schema } = mongoose; 

const UserSchema = new Schema({
	firstName:  { type: String, required: true }, 
	secondName: { type: String, required: true }, 
	department: { type: String, required: true }, 
	rol:        { type: String, required: true }
	
});

module.exports = mongoose.model('User', UserSchema);