#!/usr/bin/env node

// Grab provide args.
const [,, ...args] = process.argv;

// Print hello world provided args.
// console.log(args)

import {mdLinksCli} from './md-links-cli.js';

const path = args[0];
const arrOptions = args.slice(1);

mdLinksCli(path, arrOptions)
  .then(result => console.log(result))
  .catch(error => {
    if(error.code === 'ERR_INVALID_ARG_TYPE') {
      console.log('El argumento debería ser un string')
    } else if(error.code === 'ENOENT') {
      console.log('Ingrese una ruta válida')
    } else {
      console.log(error.message)
    }    
  });
         

