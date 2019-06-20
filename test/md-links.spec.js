import fetchMock from '../__mocks__/node-fetch.js';
fetchMock.config.sendAsJson = false;
 
import {mdLinks} from '../src/md-links.js';
import path from 'path';

describe('Test functión mdLinks', () => {
  fetchMock
    .mock('https://www.google.com/', 200)
    .mock('https://elcomercio.pe/', 404);
  it('Es una función MdLinks', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Obtiene un array de links con la opción de validate:false', (done) => {
    const arrLinks = [ { href: 'https://www.google.com/',
      text: 'Google',
      file: path.join(process.cwd(), '/example', '/example.md')            
    },
    { href: 'https://elcomercio.pe/',
      text: 'El Comercio',
      file: path.join(process.cwd(), '/example', '/example.md') } ];
    mdLinks(path.join(process.cwd(), '/example', '/example.md'), {validate: false})
      .then(result => {
        expect(result).toEqual(arrLinks);
        done();
      });        
  });   
  it('Obtiene un array de links con la opción de validate:true', (done) => {
    const arrLinks = [ { href: 'https://www.google.com/',
      text: 'Google',
      file: path.join(process.cwd(), '/example', '/example.md'),
      status: 200,
      statusText: 'OK' },
    { href: 'https://elcomercio.pe/',
      text: 'El Comercio',
      file: path.join(process.cwd(), '/example', '/example.md'),
      status: 404,
      statusText: 'Fail' } ];

    mdLinks(path.join(process.cwd(), '/example', '/example.md'), {validate: true})
      .then(result => {
        expect(result).toEqual(arrLinks);
        done();
      });
  });
});