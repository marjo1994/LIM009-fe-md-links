import { isAbsolute, convertToAbsolute, verifyIsFile, extensionName, verifyDirectory, readDirectory, readFile, getPaths, getPathsOfMarkdowns, getLinks} from "../src/index.js";
import path from 'path'

const files = [
"example.md",
"example_absolute.js",
"example_relative.js",
"prueba",
"vacio" ];
const paths = [path.join(process.cwd(), '/example', '/example.md'),
path.join(process.cwd(), '/example', '/example_absolute.js'),
path.join(process.cwd(), '/example', '/example_relative.js'),
path.join(process.cwd(), '/example', '/prueba', '/example2.md'),
path.join(process.cwd(), '/example', '/prueba', '/examplefile2.js'),
path.join(process.cwd(), '/example', '/prueba', '/prueba.1', '/example2.md'),
path.join(process.cwd(), '/example', '/prueba', '/prueba.1', '/examplefile2.js')]


describe('Es una función que permite conocer si la ruta es absoluta o no',() => {
    it('isAbsolute debería ser una función', () => {
        expect(typeof isAbsolute).toBe('function');
    });
    it('Es una ruta absoluta', () => {

        expect(isAbsolute('example/example_relative.js')).toBe(false)        
      });
    it('Es una ruta absoluta', () => {
        let pathAbsolute = path.join(process.cwd(), '/example', '/example_relative.js');
        expect(isAbsolute(pathAbsolute)).toBe(true)        
    });
});

describe('Es una función que permite convertir una ruta en absoluta',() => {
    it('convertToAbsolute debería ser una función', () => {
        expect(typeof convertToAbsolute).toBe('function');
    });
    it('Convierte una ruta relativa en ruta absoluta', () => {
        let expected = path.join(process.cwd(), '/example', '/example_relative.js')
        expect(convertToAbsolute('example/example_relative.js'))
        .toEqual(expected);  
      });     
});

describe('Es una función que permite verificar si es un archivo', () => {
    it('verifyIsFile debería ser una función', () => {
        expect(typeof verifyIsFile).toBe('function')
    });
    it('Verifica si es un archivo', () => {
        let pathAbsolute = path.join(process.cwd(), '/example', '/example.md')
        return verifyIsFile(pathAbsolute).then(result => {
            expect(result).toBe(true)
        });        
    });
});

describe('Es una función que permite conocer la extensión del archivo', () => {
    it('extensionName debería ser una función', () => {
        expect(typeof extensionName).toBe('function')
    });
    it('Tipo de archivo', () => {
        let pathAbsolute = path.join(process.cwd(), '/example', '/example.md')
        expect(extensionName(pathAbsolute)).toBe('.md')
    });
})

describe('Es una función que verifica si es un directorio',() => {
    it('verifyDirectory debería ser una función', () => {
        expect(typeof verifyDirectory).toBe('function')  
    });
    it('Verifica si es un directorio', () => {
        let pathAbsolute = path.join(process.cwd(), '/example')
        return verifyDirectory(pathAbsolute).then(result => {
            expect(result).toBe(true)
        });        
    });
});


describe('Es una función que obtiene un array de rutas dentro de un directorio',() => {
    it('readDirectory debería ser una función', () => {
        expect(typeof readDirectory).toBe('function')  
    });
    it('Verifica si obtiene el array de rutas', () => {
        let pathAbsolute = path.join(process.cwd(), '/example')
        expect(readDirectory(pathAbsolute)).resolves.toEqual(files)              
    });
});

describe('Es una función que lee un archivo y obtiene un string',() => {
    it('readFile debería ser una función', () => {
        expect(typeof readFile).toBe('function')  
    });
    it('Obtiene un string', () => {
        let pathAbsolute = path.join(process.cwd(), '/example' + '/prueba' + '/example2.md')
        expect(readFile(pathAbsolute)).resolves.toBe('Hola a todos')              
    });
});

describe('Es una función que obtiene un array de rutas absolutas',() => {
    it('getPaths debería ser una función', () => {
        expect(typeof getPaths).toBe('function')  
    });
    it('Obtiene un array de rutas absolutas si es un directorio', () => {
        let pathAbsolute = path.join(process.cwd(), '/example')
        return getPaths(pathAbsolute, [])
        .then(result => expect(result).toEqual(expect.arrayContaining(paths)))               
    }); 
});

describe('Es una función que obtiene un array de rutas absolutas de tipo .md',() => {
    it('getPathsOfMarkdowns debería ser una función', () => {
        expect(typeof getPathsOfMarkdowns).toBe('function')  
    });
    it('Obtiene un array de rutas absolutas tipo .md', () => {
        expect(getPathsOfMarkdowns([path.join(process.cwd(), '/example', '/example.md'),
        path.join(process.cwd(), '/example', '/example_absolute.js')])).toEqual([path.join(process.cwd(), '/example', '/example.md')])              
    });
});

describe('Es una función que obtiene los links de rutas absolutas .md', () => {
    it('getLinks debería ser una función', () => {
        expect(typeof getLinks).toBe('function')
    });
    it('Obtiene un array de links, un archivo con links y el otro sin links', () => {
        expect(getLinks([path.join(process.cwd(), '/example', '/prueba', '/example2.md'),
        path.join(process.cwd(), '/example', '/example.md')])).resolves.toStrictEqual(
        [ { href: 'https://www.google.com/',
        text: 'Google',
        file:
        path.join(process.cwd(), '/example', '/example.md')},
        { href: 'https://elcomercio.pe/',
        text: 'El Comercio',
        file:
        path.join(process.cwd(), '/example', '/example.md') } ]
        )
    });
    it('Obtiene un array de links, ambos archivos con links', () => {
        expect(getLinks([path.join(process.cwd(), '/example', '/example.md'),
        path.join(process.cwd(), '/example', '/prueba', '/prueba.1', '/example2.md')])).resolves.toEqual(expect.arrayContaining(
        [ { href: 'https://es.yahoo.com/',
        text: 'Yahoo',
        file:
        path.join(process.cwd(), '/example', '/prueba', '/prueba.1', '/example2.md') },
        { href: 'https://www.google.com/',
        text: 'Google',
        file:
        path.join(process.cwd(), '/example', '/example.md')}
        ]))
    });
    it('Obtiene un array vacío en caso de un archivo que no contenga links', () => {
        expect(getLinks(['/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/prueba/example2.md']))
        .resolves.toEqual([])
    });
});
