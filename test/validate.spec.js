import {validateHref} from "../src/validate.js";

describe('Función validateHref', () => {
    it('Debería retornar status 200', () => {
        return validateHref([ { href: 'https://www.google.com/',text: 'Google',file: 'route' }])
        .then(result => {result.forEach(e => expect(e).toHaveProperty('status', 200))});
    });
    it('Debería retornar statusText File', () => {
        return validateHref([ { href: 'https://www.gogle.com/',text: 'Google',file: 'route' }])
        .then(result => {result.forEach(e => expect(e).toHaveProperty('statusText', 'Fail'))});
    });
    it('Debería retornar statusText File', () => {
        return validateHref([ { href: 'https://jestjs.io/404',text: 'Jest',file: 'route' }])
        .then(result => {result.forEach(e => expect(e).toHaveProperty('status', 404))});
    });

    
});


