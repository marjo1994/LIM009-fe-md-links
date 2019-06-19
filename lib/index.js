"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLinks = exports.getPathsOfMarkdowns = exports.getPaths = exports.readFile = exports.readDirectory = exports.verifyDirectory = exports.extensionName = exports.verifyIsFile = exports.convertToAbsolute = exports.isAbsolute = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _marked = _interopRequireDefault(require("marked"));

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
  return fspromises.stat(file) // retorna promesa con un objeto
  .then(result => {
    return result.isFile(); // retorna el booleano con el valor 
  }).catch(error => console.log(error, 'error'));
};

exports.verifyIsFile = verifyIsFile;

const extensionName = file => {
  return _path.default.extname(file);
}; // extensionName('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md');


exports.extensionName = extensionName;

const verifyDirectory = file => {
  return fspromises.stat(file).then(result => {
    return result.isDirectory();
  });
}; //verifyDirectory('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example');


exports.verifyDirectory = verifyDirectory;

const readDirectory = file => {
  return fspromises.readdir(file);
}; // readDirectory('C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example')
// .then(result => console.log(result))


exports.readDirectory = readDirectory;

const readFile = file => {
  return fspromises.readFile(file, 'utf8');
}; // readFile('C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\prueba\\example2.md')
// .then(result => console.log(result))


exports.readFile = readFile;

const getPaths = (pathAb, arrPaths) => {
  const promise = new Promise(resolve => {
    verifyIsFile(pathAb).then(result => {
      if (result) {
        arrPaths.push(pathAb);
        resolve(arrPaths); // resolve ([pathAb])                                                   
      } else {
        readDirectory(pathAb).then(r => {
          const promesas = r.map(e => {
            let element = _path.default.join(pathAb, e);

            return getPaths(element, arrPaths);
          });
          Promise.all(promesas).then(() => resolve(arrPaths));
        });
      }

      ;
    });
  });
  return promise;
}; //getPaths('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/prueba/prueba.1', [])
//.then(result => console.log(result))


exports.getPaths = getPaths;

const getPathsOfMarkdowns = arr => {
  const pathMarkdown = arr.filter(file => {
    return _path.default.extname(file) === '.md';
  });
  return pathMarkdown;
}; // getPathsOfMarkdowns(['C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example.md',
// 'C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example_absolute.js'])


exports.getPathsOfMarkdowns = getPathsOfMarkdowns;

const getLinks = pathsMd => {
  const result = pathsMd.map(path => {
    const promise = new Promise(resolve => {
      const renderer = new _marked.default.Renderer();
      readFile(path).then(result => {
        const linksOfMarkdownFiles = [];

        renderer.link = (href, title, text) => {
          linksOfMarkdownFiles.push({
            href: href,
            text: text,
            file: path
          });
        };

        (0, _marked.default)(result, {
          renderer: renderer
        });
        resolve(linksOfMarkdownFiles);
      });
    });
    return promise;
  });
  return Promise.all(result).then(links => Array.prototype.concat(...links));
}; // getLinks(['/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/prueba/prueba.1/example2.md',
// '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md'])
// .then(result => console.log(result))


exports.getLinks = getLinks;