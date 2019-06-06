"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extensionName = exports.readDirectory = exports.verifyDirectory = exports.verifyIsFile = exports.convertToAbsolute = exports.isAbsolute = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fspromises = _fs.default.promises;

const isAbsolute = file => {
  return _path.default.isAbsolute(file);
};

exports.isAbsolute = isAbsolute;

const convertToAbsolute = file => {
  return _path.default.resolve(file);
};

exports.convertToAbsolute = convertToAbsolute;

const verifyIsFile = file => {
  // verificar si la ruta es archivo
  return fspromises.stat(file) // retorna promesa con un objeto
  .then(result => {
    console.log(result.isFile()); // retorna el booleano con el valor 
  });
};

exports.verifyIsFile = verifyIsFile;

const verifyDirectory = file => {
  return fspromises.stat(file).then(result => {
    console.log(result.isDirectory());
  });
}; //verifyDirectory('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example');


exports.verifyDirectory = verifyDirectory;

const readDirectory = file => {
  return fspromises.readdir(file).then(result => {
    console.log(result);
  }).catch(console.log('error'));
}; // readDirectory('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example');


exports.readDirectory = readDirectory;

const extensionName = file => {
  console.log(_path.default.extname(file));
}; // extensionName('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md');
// Funciones compuestas 


exports.extensionName = extensionName;

const throughDirectory = (file, callback) => {
  callback(file).forEach(element => {
    console.log(element);
  });
};

throughDirectory('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example', readDirectory);