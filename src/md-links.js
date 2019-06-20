import {convertToAbsolute, getPaths, getPathsOfMarkdowns, getLinks} from './index.js';
import {validateHref} from './validate.js';
import path from 'path';

export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    const route = convertToAbsolute(path);       
    getPaths(route, [])
      .then(getPathsOfMarkdowns)
      .then(getLinks)
      .then(result => {                 
        if (options.validate) {
          validateHref(result).then(e => resolve(e));
        } else {
          resolve(result);
        } 
      }).catch(reject);
  });
};


// mdLinks(path.join(process.cwd(), '/example', '/prueba', '/prueba.1', '/exampl'), {validate: false})
// .then(resultado => console.log(resultado));
  