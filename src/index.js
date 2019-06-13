
import path from 'path'
import fs from 'fs'
import  myMarked from 'marked'
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
 
 getLinks(['/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md', '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/prueba/prueba.1/example2.md'])
 .then(result => console.log(result))



