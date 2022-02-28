//2022, pinkromeo18, MIT.
if(!window._fetch) window._fetch=window.fetch;
var noc_fetch_debug =document.querySelector('script[src$="noc_fetch.js"')?false:true;
window.fetch = function __fetch__(u,o){
  o=Object.assign({},o, {cache:'no-cache'} )
  if(noc_fetch_debug) console.log(o);
  return window._fetch(u,o);
}
