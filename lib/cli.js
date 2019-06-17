#!/usr/bin/env node
//Grab provide args.
"use strict";

var _mdLinks = require("./md-links.js");

const [,, ...args] = process.argv; // Print hello world provided args.

console.log(args);
const path = process.argv[0];
const options = process.argv.slice(1);

const mdLinksCli = (path, options) => {
  (0, _mdLinks.mdLinks)(path, {
    validate: false
  }).then(result => console.log(result));
};

const optionsMdLinks = options => {
  options.forEach(opt => {
    if (opt === '-v' || opt === '--validate') {
      return {
        validate: true
      };
    } else if (opt === '-s' || opt === '--stats') {
      return {
        stats: true
      };
    }
  });
};