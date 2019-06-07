
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
   /// verificar si la ruta es archivo
   return fspromises.stat(file) // retorna promesa con un objeto
   .then (result => {
      return result.isFile(); // retorna el booleano con el valor 
   })
};

export const  extensionName = file => {
   return path.extname(file);
}
// extensionName('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md');

/* Verificar si es un archivo.md */
const pathAbsolute = convertToAbsolute('../LIM009-fe-md-links/example/example_relative.js');

verifyIsFile(pathAbsolute).then(result => {
  if(result === true) {
      if(extensionName(pathAbsolute) === '.md') {
         readfile(pathAbsolute).then(console.log)
      } else {
         console.log('no es un archivo .md')
      }
   } else {
      console.log('es un directorio')
   };
});

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

const getPathsMarkdowns = (pathDir) => {
  const arrPaths = [];
  readDirectory(pathDir)
   .then(r => r.map((e) => {
      return path.join(pathDir,e);
   }))
   .then(p => {
      p.forEach(pathAbsolute => {
         verifyIsFile(pathAbsolute).then(result => {
            if(result === true) {
               if(extensionName(pathAbsolute) === '.md') {
                  return arrPaths.push(pathAbsolute);
                  // readfile(pathAbsolute).then(console.log)
               } else {
                  console.log('no es un archivo .md')
               }
            } else {
               console.log('es un directorio')
            };
         });
      });
   });
   return arrPaths
}

getPathsMarkdowns('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example').then(result => console.log(result));

   
export const readFile = file => {
   return fspromises.readFile(file)
   .then(buffer => buffer.toString());
}

// readFile('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md');

// Funciones compuestas 
// const throughDirectory = (file, callback) => {
//    callback(file).forEach(element => {
//       console.log(element)
//    });
// };

// throughDirectory('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example', readDirectory);