"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statsOfLinks = void 0;

const statsOfLinks = arrLinks => {
  const arrHref = arrLinks.map(link => link.href);

  if (arrLinks.length !== 0 && arrLinks[0].hasOwnProperty('status')) {
    const failLinks = arrLinks.filter(link => {
      return link.statusText === 'Fail';
    });
    const stats = {
      total: arrLinks.length,
      unique: new Set([...arrHref]).size,
      broken: failLinks.length
    };
    return stats;
  } else {
    const stats = {
      total: arrLinks.length,
      unique: new Set([...arrHref]).size
    };
    return stats;
  }
};
/* statsOfLinks([ { href: 'https://es.yahoo.com/',
      text: 'Yahoo',
      file:
       '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md',
       status: 200,
       statusText: 'ok' },
      { href: 'https://es.yahoo.com/',
      text: 'Yahoo',
      file:
       '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md',
       status: 200,
       statusText: 'ok'},
      { href: 'https://jestjs.io/404',
      text: 'Jest',
      file:
       '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/prueba/example2.md',
      status: 404,
      statusText: 'Fail'
      } ]);*/


exports.statsOfLinks = statsOfLinks;