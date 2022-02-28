# noc_fetch
noc_fetch.js mean "no-cache" fetch

# need fastest fastest load
```
<link rel="preload" href="noc_fetch.js" as="script">
<script src="" ></script>
```

```js
//pinkromeo18, 2022, MIT.
window._fetch=window.fetch;
window.fetch = function __fetch__(u,o){
  o=Object.assign({},o, {cache:'no-cache'} )
  return window._fetch(u,o);
}
```
