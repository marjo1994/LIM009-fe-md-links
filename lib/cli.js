#!/usr/bin/env node
//Grab provide args.
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinksCli = exports.optionsMdLinks = void 0;

var _mdLinks = require("./md-links.js");

var _stats = require("./stats.js");

const [,, ...args] = process.argv; // Print hello world provided args.
// console.log(args)

const path = args[0];
const arrOptions = args.slice(1);

const optionsMdLinks = arrOptions => {
  let validate = false;
  let stats = false;
  arrOptions.forEach(option => {
    if (option === '-v' || option === '--validate') {
      validate = true;
    }

    if (option === '-s' || option === '--stats') {
      stats = true;
    }
  });
  return {
    validate,
    stats
  };
};

exports.optionsMdLinks = optionsMdLinks;

const mdLinksCli = (path, arrOptions) => {
  const options = optionsMdLinks(arrOptions);

  if (!options.stats) {
    // console.log(options);
    return (0, _mdLinks.mdLinks)(path, options).then(result => {
      let output = '';
      result.forEach(element => {
        if (options.validate) {
          output += `${element.file} ${element.href} ${element.text} ${element.status} ${element.statusText} \n`;
        } else {
          output += `${element.file} ${element.href} ${element.text} \n`;
        }
      });
      return output;
    });
  } else {
    return (0, _mdLinks.mdLinks)(path, options).then(_stats.statsOfLinks).then(objStats => {
      let output = '';

      if (options.validate) {
        output += `Total: ${objStats.total} Unicos: ${objStats.unique} Broken: ${objStats.broken} \n`;
      } else {
        output += `Total: ${objStats.total} Unicos: ${objStats.unique} \n`;
      }

      return output;
    });
  }
};

exports.mdLinksCli = mdLinksCli;
mdLinksCli(path, arrOptions).then(result => console.log(result));