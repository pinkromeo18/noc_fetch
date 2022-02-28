//2022, pinkromeo18, MIT.
window._fetch=window.fetch;
window.fetch = function __fetch__(u,o){
  o=Object.assign({},o, {cache:'no-cache'} )
  return window._fetch(u,o);
}
