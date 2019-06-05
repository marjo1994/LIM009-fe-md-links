
import path from 'path'
import fs from 'fs' 

export const isAbsolute = file => {
   return path.isAbsolute(file);
};

export const convertToAbsolute = file =>{
    return path.resolve(file);
};

export const isFile = file => {
    const stats = fs.statSync(file);
   return stats.isFile();
}

export const  extensionName = file => {
   return path.extname(file);
}


/* fs.stat(file,callback(err,stats))
stats.isFile()
stats.isDirectory()*/