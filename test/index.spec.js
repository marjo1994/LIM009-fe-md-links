import { isAbsolute } from "../src/index.js";

describe('Es una función que permite conocer si la ruta es absoluta o no',() => {
    it('isAbsolute debería ser una función', () => {
        expect(typeof isAbsolute).toBe('function');
    });
    it('Es una ruta absoluta', () => {
        expect(isAbsolute('../example/example_relative.js')).toBe(false)        
      });
});


