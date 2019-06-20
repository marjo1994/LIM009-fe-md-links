import {convertToAbsolute, getPaths, getPathsOfMarkdowns, getLinks} from './index.js'
import {validateHref} from './validate.js'
import path from 'path'

export const mdLinks = (path,options) => {
    return new Promise(resolve => {
       // console.log(path)
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


// mdLinks('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/vacio', {validate: true}).then(resultado => console.log(resultado))