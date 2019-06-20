import fetch from 'node-fetch';

export const validateHref = (arrLinks) => {
  const result = arrLinks.map(link => {
    return new Promise(resolve => {
      fetch(link.href)
        .then(response => {
          if (response.status >= 200 && response.status < 400) {
            link.status = response.status,
            link.statusText = response.statusText;
            resolve(link);             
          } else {
            link.status = response.status,
            link.statusText = 'Fail';
            resolve(link);                      
          }
        }).catch((error) => {
          link.status = error.message;
          link.statusText = 'Fail';
          resolve(link);
        });
    });
  });
  return Promise.all(result);
}; 
/* validateHref([{ href: 'https://www.npjs.com/',text: 'Google',
file:
'/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md' }
 ])
.then(result => console.log(result))*/