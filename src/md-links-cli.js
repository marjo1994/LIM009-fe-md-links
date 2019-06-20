import {mdLinks} from './md-links.js';
import {statsOfLinks} from './stats.js';

export const optionsMdLinks = (arrOptions) => {
  const options = {validate: false, stats: false};
  arrOptions.forEach(option => {
    if (option === '-v' || option === '--validate') {
      options.validate = true;
    } 
    if (option === '-s' || option === '--stats') {
      options.stats = true;
    }
  });
  return options;
};

export const mdLinksCli = (path, arrOptions) => {    
  const options = optionsMdLinks(arrOptions);    
  if (!options.stats) {        
    return mdLinks(path, options).then(result => {
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
    return mdLinks(path, options)
      .then(statsOfLinks)
      .then(objStats => {
        let output = '';
        if (options.validate) {
          output += `Total: ${objStats.total} Unicos: ${objStats.unique} Broken: ${objStats.broken} \n`;
        } else {
          output += `Total: ${objStats.total} Unicos: ${objStats.unique} \n`;
        }
        return output;
      });
  };
};