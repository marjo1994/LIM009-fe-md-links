#!/usr/bin/env node

//Grab provide args.
const[,, ...args] = process.argv

// Print hello world provided args.
console.log(args)

import {mdLinks} from "./md-links.js"
import {statsOfLinks} from "./stats.js"

const path = process.argv[0];
const options = process.argv.slice(1);


const mdLinksCli = (path,options) => {
    const opt = optionsMdLinks(options)
    if(!opt.stats){
        mdLinks(path, opt)
        .then(result => console.log(result))
    } else {
        mdLinks(path, opt)
        .then(result =>  )
    }
}

const optionsMdLinks = (options) => {
    options.forEach(opt => {
        if(opt === '-v'|| opt === '--validate' ){
            return {validate: true}
        }
        if(opt === '-s'|| opt === '--stats' ) {
            return {stats: true}
        }
    });
}

