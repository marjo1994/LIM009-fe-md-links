import {validateHref} from "../src/validate.js";



describe('Función validateHref', () => {
    it('Debería retornar status 200', () => {
        return validateHref([ { href: 'https://www.google.com/',text: 'Google',file: '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md' }])
        .then(result => expect(result).toHaveProperty('status', 200));
    })
})