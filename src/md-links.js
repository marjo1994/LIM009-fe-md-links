import {convertToAbsolute, getPaths, getPathsOfMarkdowns, getLinks} from './index.js'
import {validateHref} from './validate.js'

export const mdLinks = (path,options) => {
    return new Promise(resolve => {
       const route = convertToAbsolute(path);
       getPaths(route, [])
       .then(getPathsOfMarkdowns)
       .then(getLinks)
       .then(result => {              
          if(options.validate) {
             validateHref(result).then(e =>resolve(e))
          } else {
             resolve(result)
          } 
       })
    })      
 };

// mdLinks('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/vacio', {validate: false}).then(resultado => console.log(resultado))