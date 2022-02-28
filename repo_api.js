/*commits
[
  {
    "sha": "c055cb7340382a28f4e9c8e758864ce0d0413b5c",
    "node_id": "C_kwDOG6R9qtoAKGMwNTVjYjczNDAzODJhMjhmNGU5YzhlNzU4ODY0Y2UwZDA0MTNiNWM",
    "commit": {
      "author": {
        "name": "ピンクロメオ",
        "email": "99705203+pinkromeo18@users.noreply.github.com",
        "date": "2022-02-28T06:48:15Z"
      }
 */
/*
{
    "accept": "application/vnd.github.v3+json",
    "user-agent": "repo_api.js pinkromeo18",
    "authorization": "token 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"
}
*/
/*put
{
    "method": "PUT",
    "body": "{\"sha\":\"7c72e8010149577a02e801565d54c5168e5729cf\",\"content\":\"77yD4",\"message\":\"＃はとむぎ\"}",
    "headers": {
        "accept": "application/vnd.github.v3+json",
        "user-agent": "octokit-core.js/3.5.1 Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
        "authorization": "token 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",
        "content-type": "application/json; charset=utf-8"
    },
    "cache": "no-cache"
}
*/
/*
var theURL= new URL('https://regexr.com')
	theURL.searchParams.set( 'expression','')
	theURL.searchParams.set( 'tool', '222' )
	theURL.searchParams.set( 'input', '333' )//
	theURL.searchParams.set( 'text', '444')
console.log(theURL.toString());
*/


;(function(root){
  'use strict'
  function base64Decode(text, charset) {
    charset=charset||'utf-8';
    return fetch(`data:text/plain;charset=${charset};base64,` + text)
      .then(response => response.text());
  }

  function base64Encode(...parts) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        const offset = reader.result.indexOf(",") + 1;
        resolve(reader.result.slice(offset));
      };
      reader.readAsDataURL(new Blob(parts));
    });
  }  

  function setparam(url,opt){
    var a = new URL(url);
    Object.keys(opt)
      .map(key=>{ a.searchParams.set(key,opt[key]) })
    return a.toString();
  }

  function base(opt){
    opt.t1 = opt.t1||'',opt.t2=opt.t2||'';
    var token = opt.t1 + opt.t2; 
    token = token.replace('.',''); //<---------------- dot mask replace
	  console.log("token":token);

    const authorization ="token "+token;
    const accept = "application/vnd.github.v3+json"
    const content_type = "application/json; charset=utf-8"    
    const host = 'https://api.github.com'
    const base = host + opt.u
    const comm = base.replace('contents/','commits')
    //console.log(authorization,host,base,comm)

    //export
    var o={}
    o.encode =base64Encode
    o.decode =base64Decode
    //
    //latest date
    o.timestamp = async (file)=>{
      file = file||''
      //https://api.github.com/repos/pinkromeo18/meme/commits?path=YogaCuvo.txt&page=1&per_page=1
      var url = setparam(comm,{
        path:file,
        page:1,
        per_page:1
      })      
      var method ='GET'
      var headers = { 
        accept,
        authorization
      }
      var body = void 0

      var res = await fetch(url,{method,headers,body})
      .then(d=>d.json())
      .catch(e=>void 0)
      //console.log(res.length)
      if(!res || res.length==0) return res
      //
      //dont use sha
      //var sha = res[0].sha
      var date =res[0].commit.author.date
      var timestamp = Date.parse(date)
      //return {sha,date}
      return {date,timestamp}      
    }
    o.get = async (file)=>{
      file = file||''
      var url = base + file
      var method ='GET'
      var headers = { 
        accept,
        authorization
      }
      var body = void 0

      var res = await fetch(url,{method,headers,body})
      .then(d=>d.json())
      .catch(e=>void 0)
      if(!res) return res
      return res
    }
    o.put = async (dat,file)=>{
      if(!file) return console.error('need filename')
      if(!dat) return console.error('need dat')
      var url = base + file
      var method ='PUT'
      var headers = { 
        accept,
        authorization,
        "content-type": content_type
      }
      //sha
      var res_get = await o.get(file)
      var sha;
      if(res_get) sha =res_get.sha
      //message
      var message = file
      if(typeof dat =='string') 
        message = dat.split('\n').slice(0,1).join('');
      //content
      var content = await o.encode(dat)

      var body = {
        sha,
        message,
        content,
      }

      if(!body.sha) delete body.sha;
      body =JSON.stringify(body)

      var res = await fetch(url,{method,headers,body})
      .then(d=>d.json())
      .catch(e=>void 0)
      if(!res) return res
      return res
    }    
    //
    return o;
  }    

  ////////////////////////////////////////////
  ////////////////////////////////////////////

  function entry(opt){
    var o = base(opt);

    function jpTime(timestamp=Date.now()){
      timestamp = Date.parse( new Date(timestamp) );
      return new Date(timestamp+1000*60*60*9)
        .toISOString()
        .replace('T',' ')
        .slice(0,'YYYY/MM/DD hh:mm:ss'.length)
      ;
    }    

    o.summary =async (file)=>{
      if(!file) return console.error('need filename');
      var res =await o.get(file)
      if(!res) return res;
      var res2 =await o.timestamp(file)
      var {name,sha,content,download_url} =res
      var {date,timestamp} =res2 
      content = await o.decode(content)
      var lines = (content.match(/\n/g)||[]).length;
      var title = content.split('\n').slice(0,1).join('')
      var time = jpTime(timestamp)
      //
      return {
        name,sha,content,download_url,
        date,timestamp,
        lines,title,time
      }    

    }
    
    o.data =async (file)=>{
      if(!file) return console.error('need filename')
      var res =await o.get(file)
      if(!res) return res;
      var download_url = res.download_url
      return fetch(download_url).then(d=>d.text())
    }        

    o.upimage = async (dat,file)=>{
      var res =await o.put(dat,file)
      if(!res) return res;
      return res.content.download_url
    }
    
    /////
    console.log('repo_api v1.0')
    console.log( JSON.stringify(Object.keys(o),null,2) )
    /////
    return o;
  }
  root.repo_api = entry;
})(window||this);


/*

//with noc_fetch.js
window.api = (function(){
  var opt ={}
  opt.u ='/repos/pinkromeo18/meme/contents/'
  opt.t1 ="ghp_WjFtZHMWbe2u3v4"
  opt.t2 ="Dhr5ziHCR2ufMNi37mp3f"  
  return repo_api(opt);
}());  



var p = fn.q('#pre');
async function load(api){
  var res
  //res =await api.get("YogaCuvo.txt")
  //res =await api.put("＃あいうえを4\naaaaa","repo_text.txt")  
  // res =await api.upimage("＃あいうえを4\naaaaa","repo_text.txt")
  // return download_url
  // res =await api.timestamp("repo_text.txt")
  // res =await api.data("repo_text.txt")
  //res = await api.summary("repo_text.txt")

  //res=Date.parse("2022-02-28T06:48:15Z")
  p.textContent = JSON.stringify(res,null,2)
}
load(api)

*/
