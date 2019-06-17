import {convertToAbsolute, getPaths, getPathsOfMarkdowns, getLinks} from './index.js'
import {validateHref} from './validate.js'

const mdLinks = (path,options) => {
    return new Promise (resolve => {
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

// mdLinks('C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\ex',{validate: true}).then(resultado => console.log(resultado))