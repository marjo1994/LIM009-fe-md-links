import { isAbsolute, convertToAbsolute, verifyIsFile, extensionName, verifyDirectory, readDirectory, readFile, getPaths, getPathsOfMarkdowns, getLinks} from "../src/index.js";

const files = [
"ex",
"example.md",
"example_absolute.js",
"example_relative.js",
"prueba" ];
const paths = [
'C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example.md',
'C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example_relative.js',
'C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example_absolute.js',
'C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\prueba\\example2.md',
'C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\prueba\\examplefile2.js',
'C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\prueba\\prueba.1\\example2.md',
'C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\prueba\\prueba.1\\examplefile2.js' ];


/* describe('Es una función que permite conocer si la ruta es absoluta o no',() => {
    it('isAbsolute debería ser una función', () => {
        expect(typeof isAbsolute).toBe('function');
    });
    it('Es una ruta absoluta', () => {
        expect(isAbsolute('../LIM009-fe-md-links/example/example_relative.js')).toBe(false)        
      });
    it('Es una ruta absoluta', () => {
        expect(isAbsolute('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example_relative.js')).toBe(true)        
    });
});

describe('Es una función que permite convertir una ruta en absoluta',() => {
    it('convertToAbsolute debería ser una función', () => {
        expect(typeof convertToAbsolute).toBe('function');
    });
    it('Convierte una ruta relativa en ruta absoluta', () => {
        expect(convertToAbsolute('../LIM009-fe-md-links/example/example_relative.js')).toEqual('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example_relative.js')     
      });     
}); */

describe('Es una función que permite verificar si es un archivo', () => {
    it('verifyIsFile debería ser una función', () => {
        expect(typeof verifyIsFile).toBe('function')
    });
    it('Verifica si es un archivo', () => {
        return verifyIsFile('C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example.md').then(result => {
            expect(result).toBe(true)
        });        
    });
});

describe('Es una función que permite conocer la extensión del archivo', () => {
    it('extensionName debería ser una función', () => {
        expect(typeof extensionName).toBe('function')
    });
    it('Tipo de archivo', () => {
        expect(extensionName('C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example.md')).toBe('.md')
    });
})

describe('Es una función que verifica si es un directorio',() => {
    it('verifyDirectory debería ser una función', () => {
        expect(typeof verifyDirectory).toBe('function')  
    });
    it('Verifica si es un directorio', () => {
        return verifyDirectory('C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example').then(result => {
            expect(result).toBe(true)
        });        
    });
});


describe('Es una función que obtiene un array de rutas dentro de un directorio',() => {
    it('readDirectory debería ser una función', () => {
        expect(typeof readDirectory).toBe('function')  
    });
    it('Verifica si obtiene el array de rutas', () => {
        expect(readDirectory('C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example')).resolves.toEqual(files)              
    });
});

describe('Es una función que obtiene un array de archivos dentro de un directorio',() => {
    it('readFile debería ser una función', () => {
        expect(typeof readFile).toBe('function')  
    });
    it('Obtiene un array de archivos', () => {
        expect(readFile('C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\prueba\\example2.md')).resolves.toBe('Hola a todos')              
    });
});

describe('Es una función que obtiene un array de rutas absolutas',() => {
    it('getPaths debería ser una función', () => {
        expect(typeof getPaths).toBe('function')  
    });
    it('Obtiene un array de rutas absolutas si es un directorio', () => {
        expect(getPaths('C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example', [])).resolves.toEqual(expect.arrayContaining(paths))             
    });
    it('Obtiene un array de rutas absolutas si es un archivo', () => {
        expect(getPaths('C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example.md', [])).resolves.toEqual(['C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example.md'])              
    });
});

describe('Es una función que obtiene un array de rutas absolutas de tipo .md',() => {
    it('getPathsOfMarkdowns debería ser una función', () => {
        expect(typeof getPathsOfMarkdowns).toBe('function')  
    });
    it('Obtiene un array de rutas absolutas tipo .md', () => {
        expect(getPathsOfMarkdowns(['C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example.md',
        'C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example_absolute.js'])
        ).toEqual(['C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example.md'])              
    });
});

describe('Es una función que obtiene los links de rutas absolutas .md', () => {
    it('getLinks debería ser una función', () => {
        expect(typeof getLinks).toBe('function')
    });
    it('Obtiene un array de links, un archivo con links y el otro sin links', () => {
        expect(getLinks(['C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\prueba\\example2.md',
         'C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example.md'])).resolves.toStrictEqual(
        [ { href: 'https://www.google.com/',
        text: 'Google',
        file:
         'C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example.md' },
        { href: 'https://elcomercio.pe/',
        text: 'El Comercio',
        file:
         'C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\example.md' } ]
        )
    });
    it('Obtiene un array vacío en caso el archivo no contenga links', () => {
        expect(getLinks(['C:\\Users\\usuario\\Documents\\md-links\\LIM009-fe-md-links\\example\\prueba\\example2.md'])).resolves.toEqual([])
    });
});
