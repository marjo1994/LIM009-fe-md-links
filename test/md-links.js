import {mdLinks} from "../src/md-links.js"
import path from 'path'

describe('Test functión mdLinks', () => {
    it('Es una función MdLinks', () => {
        expect(typeof mdLinks).toBe('function')
    });
    it('Obtiene un array de links con la opción de validate:false', (done) => {
        const arrLinks =  [ { href: 'https://www.google.com/',
        text: 'Google',
        file: path.join(process.cwd(), '/example', '/example.md')            
        },
        { href: 'https://elcomercio.pe/',
        text: 'El Comercio',
        file: path.join(process.cwd(), '/example', '/example.md') } ];
        mdLinks(path.join(process.cwd(), '/example', '/example.md'), {validate: false})
            .then(result => {
                expect(result).toEqual(arrLinks)
                done()
            });        
    });   
    it('Obtiene un array de links con la opción de validate:true', (done) => {
        const arrLinks = [ { href: 'https://www.google.com/',
        text: 'Google',
        file:
        '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md',
        status: 200,
        statusText: 'OK' },
        { href: 'https://elcomercio.pe/',
        text: 'El Comercio',
        file:
        '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md',
        status: 200,
        statusText: 'OK' } ]

        mdLinks(path.join(process.cwd(), '/example', '/example.md'), {validate: true})
            .then(result => {
                expect(result).toEqual(arrLinks)
                done()
            });
    });
           
});