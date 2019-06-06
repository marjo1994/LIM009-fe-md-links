"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extensionName = exports.convertToAbsolute = exports.isAbsolute = void 0;

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
}; // fsPromises.stat(path[, options])

/* export const isFile = file => {
    const stats = fs.statSync(file);
   return stats.isFile();
} */


exports.convertToAbsolute = convertToAbsolute;

const extensionName = file => {
  return _path.default.extname(file);
};
/* fs.stat(file,callback(err,stats))
stats.isFile()
stats.isDirectory()*/


exports.extensionName = extensionName;