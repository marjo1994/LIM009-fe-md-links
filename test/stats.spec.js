import {statsOfLinks} from '../src/stats.js';

const arrLinks = [ { href: 'https://es.yahoo.com/',
  text: 'Yahoo',
  file:
 'route' },
{ href: 'https://es.yahoo.com/',
  text: 'Yahoo',
  file:
 'route' },
{ href: 'https://es.google.com/',
  text: 'Google',
  file:
 'route'
} ];

const arrLinksStatus = [ { href: 'https://es.yahoo.com/',
  text: 'Yahoo',
  file:
 'route',
  status: 200,
  statusText: 'ok' },
{ href: 'https://es.yahoo.com/',
  text: 'Yahoo',
  file:
 'route',
  status: 200,
  statusText: 'ok' },
{ href: 'https://jestjs.io/404',
  text: 'Jest',
  file:
 'route',
  status: 404,
  statusText: 'Fail' 
} ];

describe('statsOfLinks', () => {
  it('statsOfLinks debería ser una función', () => {
    expect(typeof statsOfLinks).toBe('function');
  });
  it('statsOfLinks debería retornar la cantidad total de links y links unicos', () => {
    expect(statsOfLinks(arrLinks)).toEqual({ total: 3, unique: 2 });
  });
  it('statsOfLinks debería retornar la cantidad total de links, links unicos y links rotos', () => {
    expect(statsOfLinks(arrLinksStatus)).toEqual({ total: 3, unique: 2, broken: 1 });
  });
});