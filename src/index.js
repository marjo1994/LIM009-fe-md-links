
import path from 'path'
import fs from 'fs'
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
   .then(buffer => buffer.toString());
}

// readFile('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md');

const getPathsMarkdowns = (pathAb) => {
  const arrPaths = [];  
   verifyIsFile(pathAb).then(result => {
      if(result === true) {
         if(extensionName(pathAb) === '.md') {
            arrPaths.push(pathAb);
            // console.log(arrPaths);
            // readfile(pathAbsolute).then(console.log)
         } else {
            arrPaths.push(0);
            // console.log(arrPaths);
         }
      } else {
         readDirectory(pathAb)
         .then(r => r.map((e) => {
            let element = path.join(pathAb,e);
            getPathsMarkdowns(element);
         }));
      };
   });
  return Promise.all(arrPaths)
         .then(paths => paths);
};   
getPathsMarkdowns(convertToAbsolute("example"))
.then(result => console.log(result));



