
import path from 'path'
import fs from 'fs'
import  myMarked from 'marked'
import fetch from 'node-fetch'
const fspromises = fs.promises

//Si existe la ruta o no en vez de isAbsolute.
export const isAbsolute = file => {
   return path.isAbsolute(file);
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
// md-links funciona con rutas absolutas no necesita verificar si es relativa
export const convertToAbsolute = file => {
    return path.resolve(file);
};
                                                                     
export const verifyIsFile = file => { 
   return fspromises.stat(file) // retorna promesa con un objeto
   .then (result => {
      return result.isFile(); // retorna el booleano con el valor 
   })
};

export const  extensionName = file => {
  return path.extname(file);
}
// extensionName('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md');

export const verifyDirectory = file => {
   return fspromises.stat(file)
   .then (result =>{
      console.log(result.isDirectory());
   })
};

//verifyDirectory('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

export const readDirectory = file => {
    return fspromises.readdir(file)
    .then(result => {
       return result;
      // console.log(result)
    })
};

export const readFile = file => {
   return fspromises.readFile(file)
   .then(buffer => buffer.toString())
}

// readFile('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md');

const getPaths = (pathAb, arrPaths) => {   
   const promise = new Promise((resolve) => {      
      verifyIsFile(pathAb).then(result => {
         if(result) { 
               arrPaths.push(pathAb);
               resolve(arrPaths); // resolve ([pathAb])                                                   
         } 
         else {
            readDirectory(pathAb)
               .then(r => {
                  const promesas = r.map((e) => {
                     let element = path.join(pathAb,e);
                     return getPaths(element, arrPaths);
                  })
                  Promise.all(promesas).then(() => resolve(arrPaths))
            });
         };              
      });  
   });
   
  return promise
};   

const getPathsOfMarkdowns = (arr) => {
  const pathMarkdown = arr.filter(file => {
     return path.extname(file) === '.md'
   });
   return pathMarkdown;
}; 

const getLinks = (pathsMd) => {

   const result = pathsMd.map(path => {
      const promise = new Promise(resolve => {
         const renderer = new myMarked.Renderer();
            readFile(path).then(result => {
            const linksOfMarkdownFiles = [];
            renderer.link = (href, title, text) => {
               linksOfMarkdownFiles.push({
                  href: href,
                  text: text,
                  file: path
               })
               resolve(linksOfMarkdownFiles)
            }
            myMarked(result, {renderer: renderer})
            });
      });
      return promise
   });
   return Promise.all(result)
   .then(links => Array.prototype.concat(...links))
 };
 
 // getLinks(['/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md', '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/prueba/prueba.1/example2.md'])
 // .then(result => console.log(result))


 const validateHref = (arrLinks) => {
      const result = arrLinks.map(link => {
      return new Promise (resolve => {
         fetch(link.href)
        .then(response => {
            if(response.status>=200 && response.status<400) {
               link.status = response.status,
               link.statusText = response.statusText
               resolve(link)
               // console.log(response.statusText)
               // console.log(response.status)
            } else {
               link.status = response.status,
               link.statusText = 'Fail'
               resolve(link)
               // console.log(response.statusText)            
            }
           }).catch((error) => { 
               link.status = error.code,
               link.statusText = 'Fail'
               resolve(link)
           });
      })
   });
    return Promise.all(result)
 }; 

 /*validateHref([ { href: 'https://www.google.com/',
 text: 'Google',
 file:
  '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md' },
{ href: 'https://es.yahoo.com/',
 text: 'Yahoo',
 file:
  '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md' },
{ href: 'https://es.yahoo.com/',
 text: 'Yahoo',
 file:
  '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/prueba/prueba.1/example2.md' } ])
  .then(result => console.log(result))*/

const statsOflinks = (arrLinks) => {
const arrHref = arrLinks.map(link => link.href);
     if(arrLinks[0].hasOwnProperty('status')) {
         const failLinks = arrLinks.filter(link => {
           return link.statusText === 'Fail'
           })         
         const stats = {
           total : arrLinks.length,
           unique : new Set([...arrHref]).size,
           broken : failLinks.length
           };
        return stats
     } else {        
        const stats = {
           total : arrLinks.length,
           unique : new Set([...arrHref]).size,
        };
        return stats
     }
  }

 /* statsOflinks([ { href: 'https://es.yahoo.com/',
   text: 'Yahoo',
   file:
    '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md' },
 { href: 'https://es.yahoo.com/',
   text: 'Yahoo',
   file:
    '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md' },
 { href: 'https://es.google.com/',
   text: 'Google',
   file:
    '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/prueba/example2.md'
  } ]); */

  const mdLinks = (path,options) => {
   return new Promise (resolve => {
      const pathAb = convertToAbsolute(path);
      getPaths(pathAb, [])
      .then(getPathsOfMarkdowns)
      .then(getLinks).then(result => {
         if(options.validate) {
            validateHref(result).then(e =>resolve(e))
         } else {
            resolve(result)
         }
      });
   })
  };

  // mdLinks('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md', { validate: true } ).then(resultado =>console.log(resultado))