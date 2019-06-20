"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _index = require("./index.js");

var _validate = require("./validate.js");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    const route = (0, _index.convertToAbsolute)(path);
    (0, _index.getPaths)(route, []).then(_index.getPathsOfMarkdowns).then(_index.getLinks).then(result => {
      if (options.validate) {
        (0, _validate.validateHref)(result).then(e => resolve(e));
      } else {
        resolve(result);
      }
    }).catch(reject);
  });
}; // mdLinks(path.join(process.cwd(), '/example', '/prueba', '/prueba.1', '/exampl'), {validate: false})
// .then(resultado => console.log(resultado));


exports.mdLinks = mdLinks;