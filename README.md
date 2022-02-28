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
  return window._fetch(u,o);
}
```



# repo_api
```
<script src="https://pinkromeo18.github.io/noc_fetch/noc_fetch.js" ></script>
<script src="https://pinkromeo18.github.io/noc_fetch/repo_api.js" >
</script>

```
