import fetchMock from "../__mocks__/node-fetch.js"
import {validateHref} from "../src/validate.js";
fetchMock.config.sendAsJson = false;
 
describe('Función validateHref', () => {
    fetchMock
    .mock('https://nodejs.org/es/docs/',200)
    .mock('https://www.linguee.es/ingles-espanol/traduccion/fetch.html',404)
    .mock('https://www.no-existe.com/', {throws: new TypeError('error')})
    
    it('Debería retornar status 200', (done) => {
        return validateHref([ { href: 'https://nodejs.org/es/docs/',text: 'Nodejs',file: 'route' }])
        .then(result => {result.forEach(e => expect(e).toHaveProperty('status', 200))
        done()
        });
    });   
    it('Debería retornar status 404', (done) => {
        return validateHref([ { href: 'https://www.linguee.es/ingles-espanol/traduccion/fetch.html',text: 'Linguee',file: 'route' }])
        .then(result => {result.forEach(e => expect(e).toHaveProperty('status', 404))
        done()
        });
        
    });
    it('Debería retornar statusText Fail', (done) => {
        return validateHref([ { href: 'https://www.no-existe.com/',text: 'Invalido',file: 'route' }])
        .then(result => {result.forEach(e => expect(e).toHaveProperty('status', 'error'))
        done()
        });
    });    
});

