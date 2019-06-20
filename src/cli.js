#!/usr/bin/env node

//Grab provide args.
const[,, ...args] = process.argv

// Print hello world provided args.
// console.log(args)

import {mdLinks} from "./md-links.js"
import {statsOfLinks} from "./stats.js"

const path = args[0];
const arrOptions = args.slice(1);

export const optionsMdLinks = (arrOptions) => {
    let validate = false;
    let stats = false;
        arrOptions.forEach(option => {
            if(option === '-v'|| option === '--validate' ) {
               validate = true
            }
            if(option === '-s'|| option === '--stats' ) {
                stats = true
            }  
        });
    return {validate, stats};
}

export const mdLinksCli = (path, arrOptions) => {
    const options = optionsMdLinks(arrOptions);
    
    if(!options.stats){
    // console.log(options);
        return mdLinks(path,options).then(result => {
            let output = '';
            result.forEach(element => {           
                if(options.validate) {
                    output += `${element.file} ${element.href} ${element.text} ${element.status} ${element.statusText} \n`               
                } else {
                    output += `${element.file} ${element.href} ${element.text} \n`                
                }
            })
            return output;
        })
    } else {
        return mdLinks(path,options)
        .then(statsOfLinks)
        .then(objStats => {
            let output ='';
            if(options.validate) {
                output += `Total: ${objStats.total} Unicos: ${objStats.unique} Broken: ${objStats.broken} \n`
            } else {
                output += `Total: ${objStats.total} Unicos: ${objStats.unique} \n`
            }
            return output;
        })
    }
};

mdLinksCli(path, arrOptions)
.then(result => console.log(result))



         

