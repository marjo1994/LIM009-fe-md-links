"use strict";

var _index = require("./index.js");

var _validate = require("./validate.js");

const mdLinks = (path, options) => {
  return new Promise(resolve => {
    const route = (0, _index.convertToAbsolute)(path);
    (0, _index.getPaths)(route, []).then(_index.getPathsOfMarkdowns).then(_index.getLinks).then(result => {
      if (options.validate) {
        (0, _validate.validateHref)(result).then(e => resolve(e));
      } else {
        resolve(result);
      }
    });
  });
}; // mdLinks('C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\ex',{validate: true}).then(resultado => console.log(resultado))