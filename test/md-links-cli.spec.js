import fetchMock from '../__mocks__/node-fetch.js';
fetchMock.config.sendAsJson = false;

import {mdLinksCli, optionsMdLinks} from '../src/md-links-cli.js';
import path from 'path';


describe('Test de mdLinksCli', () => {
  fetchMock
    .mock('https://es.yahoo.com/', 200);
    
  it('Función mdLinksCli', () => {
    expect(typeof mdLinksCli).toBe('function');
  });
  it('Función mdLinksCli con un arrOptions []', (done) => {
    mdLinksCli(path.join(process.cwd(), '/example', '/prueba', '/prueba.1', '/example2.md'), [])
      .then(result => {            
        expect(result).toBe(`${path.join(process.cwd(), '/example', '/prueba', '/prueba.1', '/example2.md')} https://es.yahoo.com/ Yahoo \n`);
        done();
      });
  });
  it('Función mdLinksCli con un arrOptions [--validate]', (done) => {
    mdLinksCli(path.join(process.cwd(), '/example', '/prueba', '/prueba.1', '/example2.md'), ['--validate'])
      .then(result => {            
        expect(result).toBe(`${path.join(process.cwd(), '/example', '/prueba', '/prueba.1', '/example2.md')} https://es.yahoo.com/ Yahoo 200 OK \n`);
        done();
      });
  });
  it('Función mdLinksCli con un arrOptions [--stats]', (done) => {
    mdLinksCli(path.join(process.cwd(), '/example', '/prueba', '/prueba.1', '/example2.md'), ['--stats'])
      .then(result => {            
        expect(result).toBe('Total: 1 Unicos: 1 \n');
        done();
      });
  });
  it('Función mdLinksCli con un arrOptions [--validate, --stats]', (done) => {
    mdLinksCli(path.join(process.cwd(), '/example', '/prueba', '/prueba.1', '/example2.md'), ['--validate', '--stats'])
      .then(result => {            
        expect(result).toBe('Total: 1 Unicos: 1 Broken: 0 \n');
        done();
      });
  });
});

describe('Test optionsMdLinks', () => {
  it('Función optionsMdLinks en el caso que reciba un array [--validate,--stats]', () => {
    expect(optionsMdLinks(['--validate', '--stats'])).toMatchObject({validate: true, stats: true});
  });
  it('Función optionsMdLinks en el caso que reciba un array []', () => {
    expect(optionsMdLinks([])).toMatchObject({validate: false, stats: false});
  });
});

