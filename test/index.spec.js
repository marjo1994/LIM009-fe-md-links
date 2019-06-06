import { isAbsolute, convertToAbsolute } from "../src/index.js";

describe('Es una función que permite conocer si la ruta es absoluta o no',() => {
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
    it('isAbsolute debería ser una función', () => {
        expect(typeof convertToAbsolute).toBe('function');
    });
    it('Convierte una ruta relativa en ruta absoluta', () => {
        expect(convertToAbsolute('../LIM009-fe-md-links/example/example_relative.js')).toEqual('/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example_relative.js')     
      });     
});




