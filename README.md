# noc_fetch
noc_fetch.js mean "no-cache" fetch

# need fastest fastest load
```
<link rel="preload" href="https://pinkromeo18.github.io/noc_fetch/noc_fetch.js" as="script">
<script src="https://pinkromeo18.github.io/noc_fetch/noc_fetch.js" ></script>
```

```js
//2022, pinkromeo18, MIT.
window._fetch=window.fetch;
window.fetch = function __fetch__(u,o){
  o=Object.assign({},o, {cache:'no-cache'} )
  return window._fetch(u,o);
}
```
