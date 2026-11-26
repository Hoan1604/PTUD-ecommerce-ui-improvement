import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { api } from './app.mjs';

const root = new URL('./',import.meta.url);
mkdirSync(new URL('data/',root),{recursive:true});
const db = new DatabaseSync(process.env.TODO_DB || fileURLToPath(new URL('data/todo.sqlite',root)));
db.exec(readFileSync(new URL('drizzle/0000_tasks.sql',root),'utf8'));
// Adapt SQLite statements to the same interface used by the hosted application.
function prepared(sql,values=[]) {
  const statement=db.prepare(sql);
  return {
    bind:(...args)=>prepared(sql,args),
    first:()=>statement.get(...values),
    all:()=>({results:statement.all(...values)}),
    run:()=>statement.run(...values)
  };
}
const storage={prepare:prepared,batch(statements){
  db.exec('BEGIN IMMEDIATE');
  try { for(const statement of statements) statement.run(); db.exec('COMMIT'); }
  catch(error){ db.exec('ROLLBACK'); throw error; }
}};
const assets={'/':['index.html','text/html'],'/style.css':['style.css','text/css'],'/ui.js':['ui.js','text/javascript']};
const port=Number(process.env.PORT||3017);
http.createServer(async(req,res)=>{
  try {
    const url=new URL(req.url,'http://'+req.headers.host);
    if (url.pathname.startsWith('/api/')) {
      let body=''; req.setEncoding('utf8');
      for await(const chunk of req){body+=chunk;if(body.length>16000){res.writeHead(413);res.end();return;}}
      const request=new Request(url,{method:req.method,headers:req.headers,body:body||undefined});
      const result=await api(request,storage);
      res.writeHead(result.status,Object.fromEntries(result.headers)); res.end(await result.text()); return;
    }
    const asset=Object.hasOwn(assets,url.pathname) && assets[url.pathname];
    if(!asset){res.writeHead(404);res.end();return;}
    res.writeHead(200,{'Content-Type':asset[1]+'; charset=utf-8'});res.end(readFileSync(new URL('public/'+asset[0],root)));
  } catch(error){console.error(error.message);res.writeHead(500,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'Không thể truy cập dữ liệu.'}));}
}).listen(port,'127.0.0.1',()=>console.log('Nhịp Việc: http://127.0.0.1:'+port));
