/*alert('React Goes Here');*/

import React from 'react';
import { render } from 'react-dom';

import App from './App'; 


//le decimmos a react voy a crear un componente 
// que dentro tiene una H1 
//lo vamos a renderizar 
// donde esta el Id APP en el index.html 
// el navegador no puede procesar este archivo 
//por eso necesitamos convertirlo con el complemento WEBPACK 



render(<App/>, document.getElementById('app'));