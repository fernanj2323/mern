//webpack va  a convertir la entrada y lo mostrata en la salida. 
//mostrata el codigo converitdo en public 

module.exports = { 
    entry: './src/app/index.js',
    output: {
    	path: __dirname + '/src/public',
    	filename: 'bundle.js' 
    },
    //este objeto tiene una propiedad llamada rules 
    // rules es un arreglo que esta compuesto por varios objetos 
    //cada objeto son ordenes para webpack 
    //usa babel loader, para convertir mas tipos de archivos 
    //va a convertir todos los archivos que terminen en .js
    //y que no tome los que estan en la carpeta node_modules ya que ahi dentro estan los archivos para que node pueda funcionar. 

    module: {
    	rules: [

    		{
    			use: 'babel-loader',
    			test: /\.js$/,
    			exclude: /node_modules/
    		}

    	]
    }
};