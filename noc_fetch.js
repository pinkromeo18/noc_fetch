//2022, pinkromeo18, MIT.
if(!window._fetch) window._fetch=window.fetch;  //<-- support multi load
//window.noc_fetch_debug = void 0;//<-- support debug
window.fetch = function __fetch__(u,o){
  o=Object.assign({},o, {cache:'no-cache'} )
  if(window.noc_fetch_debug) console.log(o);
  return window._fetch(u,o).then(support_catch)
  ;  
  function support_catch(res) {  //<---- support .catch
    if (res.ok) return res;
    else throw new Error(res.statusText);
  }
}

window.setparam = function setparam(url,opt){  //<--- util setparam
  var a = new URL(url);
  Object.keys(opt)
  .map(key=>{ a.searchParams.set(key,opt[key]) })
  return a.toString();
}

window.getparam = function getparam(key){   //<--- util getparam
  var p = new URL(location.href).searchParams;
  var value = p.get(key)|| '';
  return value;
}
