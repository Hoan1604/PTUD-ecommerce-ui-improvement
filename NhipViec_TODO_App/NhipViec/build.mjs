import {readFileSync as read,writeFileSync as write,mkdirSync,cpSync} from 'node:fs';
mkdirSync('dist/server',{recursive:true});
mkdirSync('dist/.openai',{recursive:true});
cpSync('.openai/hosting.json','dist/.openai/hosting.json');
cpSync('drizzle','dist/.openai/drizzle',{recursive:true});
const assets={};
for(const [path,file,type] of [['/','index.html','text/html'],['/style.css','style.css','text/css'],['/ui.js','ui.js','text/javascript']]){
  assets[path]=[type+'; charset=utf-8',read('public/'+file,'utf8')];
}
write('dist/server/index.js',read('app.mjs','utf8')+'\nconst assets='+JSON.stringify(assets)+`;
export default {async fetch(request,env){
  const path=new URL(request.url).pathname;
  if(path.startsWith('/api/')) {
    try { return await api(request,env.DB); }
    catch(error){ console.error(error.message); return Response.json({error:'Không thể truy cập dữ liệu.'},{status:500}); }
  }
  if(!Object.hasOwn(assets,path)) return new Response('404',{status:404});
  return new Response(assets[path][1],{headers:{'Content-Type':assets[path][0]}});
}};`);
