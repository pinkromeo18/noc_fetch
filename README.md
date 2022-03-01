# noc_fetch
noc_fetch.js mean "no-cache" fetch

# need fastest fastest load

right
```
<script src="https://pinkromeo18.github.io/noc_fetch/noc_fetch.js" ></script>
```
debug
```
<script src="https://pinkromeo18.github.io/noc_fetch/noc_fetch.js?debug=true" ></script>
```

```js
//2022, pinkromeo18, MIT.
if(!window._fetch) window._fetch=window.fetch;  //<-- support multi load
var noc_fetch_debug =document.querySelector('script[src$="noc_fetch.js"')?false:true; //<-- support debug
window.fetch = function __fetch__(u,o){
  o=Object.assign({},o, {cache:'no-cache'} )
  if(noc_fetch_debug) console.log(o);
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
```



# repo_api
```
<script src="https://pinkromeo18.github.io/noc_fetch/noc_fetch.js" ></script>
<script src="https://pinkromeo18.github.io/noc_fetch/repo_api.js" ></script>
<script>
window.api = (function(){
  var opt ={}
  opt.u ='/repos/pinkromeo18/flyme/contents/'
  opt.t1 =""
  opt.t2 =""  
  return repo_api(opt);
}());  
</script>

```
```
repo_api v1.0
[
  "encode",
  "decode",
  "timestamp",
  "get",
  "put",
  "summary",
  "data",
  "upimage"
]
```
