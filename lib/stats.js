"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statsOflinks = void 0;

const statsOflinks = arrLinks => {
  const arrHref = arrLinks.map(link => link.href);

  if (arrLinks[0].hasOwnProperty('status')) {
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

exports.statsOflinks = statsOflinks;
statsOflinks([{
  href: 'https://es.yahoo.com/',
  text: 'Yahoo',
  file: '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md'
}, {
  href: 'https://es.yahoo.com/',
  text: 'Yahoo',
  file: '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md'
}, {
  href: 'https://es.google.com/',
  text: 'Google',
  file: '/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/prueba/example2.md'
}]);