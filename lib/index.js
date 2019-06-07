"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = exports.readDirectory = exports.verifyDirectory = exports.extensionName = exports.verifyIsFile = exports.convertToAbsolute = exports.isAbsolute = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fspromises = _fs.default.promises; //Si existe la ruta o no en vez de isAbsolute.

const isAbsolute = file => {
  return _path.default.isAbsolute(file);
}; // md-links funciona con rutas absolutas no necesita verificar si es relativa


exports.isAbsolute = isAbsolute;

const convertToAbsolute = file => {
  return _path.default.resolve(file);
};

exports.convertToAbsolute = convertToAbsolute;

const verifyIsFile = file => {
  console.log(file); /// verificar si la ruta es archivo

  fspromises.stat(file) // retorna promesa con un objeto
  .then(result => {
    return result.isFile(); // retorna el booleano con el valor 
  });
};

exports.verifyIsFile = verifyIsFile;

const extensionName = file => {
  return _path.default.extname(file);
}; // extensionName('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md');

/* Verificar si es un archivo.md */


exports.extensionName = extensionName;
const pathAbsolute = convertToAbsolute('../LIM009-fe-md-links/example/example_relative.js');
verifyIsFile(pathAbsolute).then(result => {
  if (result === true) {
    if (extensionName(pathAbsolute) === '.md') {
      readfile(pathAbsolute).then(console.log);
    } else {
      console.log('no es un archivo .md');
    }
  } else {
    console.log('es un directorio');
  }

  ;
});

const verifyDirectory = file => {
  return fspromises.stat(file).then(result => {
    console.log(result.isDirectory());
  });
}; //verifyDirectory('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example');


exports.verifyDirectory = verifyDirectory;

const readDirectory = file => {
  return fspromises.readdir(file).then(result => {
    return result; // console.log(result)
  }).catch(console.log('error'));
};

exports.readDirectory = readDirectory;

const getPathsMarkdowns = rutaDeUnDir => {
  readDirectory('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example').then(r => r.map(convertToAbsolute)).then(p => console.log(p)); //return array de rutas mds
};

const readFile = file => {
  return fspromises.readFile(file).then(buffer => buffer.toString());
};

exports.readFile = readFile;
readFile('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md'); // Funciones compuestas 
// const throughDirectory = (file, callback) => {
//    callback(file).forEach(element => {
//       console.log(element)
//    });
// };
// throughDirectory('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example', readDirectory);