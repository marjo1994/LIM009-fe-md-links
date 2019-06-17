import fetch from 'node-fetch'

export const validateHref = (arrLinks) => {
    const result = arrLinks.map(link => {
    return new Promise (resolve => {
       fetch(link.href)
      .then(response => {
          if(response.status>=200 && response.status<400) {
             link.status = response.status,
             link.statusText = response.statusText
             resolve(link)
             // console.log(response.statusText)
             // console.log(response.status)
          } else {
             link.status = response.status,
             link.statusText = 'Fail'
             resolve(link)
             // console.log(response.statusText)            
          }
       }).catch((error) => { 
             link.status = error.code,
             link.statusText = 'Fail'
             resolve(link)
       });
    })
 });
  return Promise.all(result)
}; 

/*validateHref([ { href: 'https://www.google.com/',
text: 'Google',
file:
'/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md' },
{ href: 'https://es.yahoo.com/',
text: 'Yahoo',
file:
'/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/example.md' },
{ href: 'https://es.yahoo.com/',
text: 'Yahoo',
file:
'/home/marjorie/Documentos/md-links/LIM009-fe-md-links/example/prueba/prueba.1/example2.md' } ])
.then(result => console.log(result))*/