import { isAbsolute } from "../src/index.js";

describe('Es una función',() => {
    it('isAbsolute debería ser una función', () => {
        expect(typeof isAbsolute).toBe('function');
    });
});

describe('Tipo de ruta',() => {
    it('Es una ruta absoluta', () => {
      expect(isAbsolute('../example/example_relative.js')).toBe(false)        
    });
});