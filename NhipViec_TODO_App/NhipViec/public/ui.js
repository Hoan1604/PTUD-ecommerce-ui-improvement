'use strict';
const $ = selector => document.querySelector(selector);
const labels = {todo:'Chưa làm',doing:'Đang làm',done:'Hoàn thành'};
const groups = {study:['Học tập','#8a77ae'],work:['Công việc','#628aa4'],personal:['Cá nhân','#c58a59']};
const icons = {
 board:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
 chart:'<path d="M4 4v16h17M8 16v-4m5 4V7m5 9v-6"/>',
 layout:'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 5v14"/>',
 plus:'<path d="M12 5v14M5 12h14"/>', close:'<path d="m6 6 12 12M18 6 6 18"/>',
 search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
 todo:'<rect x="4" y="5" width="16" height="16" rx="3"/><path d="M8 3v4m8-4v4M8 12h8m-8 4h5"/>',
 doing:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
 done:'<rect x="4" y="4" width="16" height="16" rx="4"/><path d="m8 12 3 3 5-6"/>',
 check:'<path d="m5 12 4 4 10-10"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4m8-4v4"/>',
 edit:'<path d="m14 5 5 5M4 20l5-1L20 8a2 2 0 0 0-5-5L4 15z"/>',
 trash:'<path d="M4 7h16m-12 0V4h8v3M6 7l1 13h10l1-13m-8 3v7m4-7v7"/>'
};
const icon = name => '<svg class="svg" viewBox="0 0 24 24" aria-hidden="true">'+icons[name]+'</svg>';
const escapeHtml = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tag = key => '<span class="tag '+key+'" style="color:'+groups[key][1]+'"><span aria-hidden="true">●</span> '+groups[key][0]+'</span>';
document.querySelectorAll('[data-icon]').forEach(el=>el.insertAdjacentHTML('afterbegin',icon(el.dataset.icon)));
$('#today').textContent=new Intl.DateTimeFormat('vi-VN',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date());
let tasks=[], filter='all', editing=null, deleting=null, busy=false, loaded=false;
const route = ()=>location.hash.slice(1) || 'board';
const page = ()=>route()==='stats'?'stats':'board';
const category = ()=>Object.keys(groups).includes(route())?route():null;
const setRoute = value => { filter='all'; $('#search').value=''; location.hash=value; render(); };
function message(text){$('#toast').textContent=text;clearTimeout(message.timer);message.timer=setTimeout(()=>$('#toast').textContent='',2600);}
async function request(path,method='GET',data){
  const result=await fetch('/api/tasks'+path,{method,headers:data?{'Content-Type':'application/json'}:{},body:data?JSON.stringify(data):undefined});
  const content=await result.json();
  if(!result.ok) throw new Error(content.error||'Không thể lưu công việc.');
  return content;
}
async function refresh(){
  try { tasks=await request(''); loaded=true; $('#error').hidden=true; render(); }
  catch(error){ $('#error').hidden=false;$('#error').textContent='Chưa tải được danh sách công việc. ';const retry=document.createElement('button');retry.textContent='Thử lại';retry.onclick=refresh;$('#error').append(retry); }
}
function render(){
  const cat=category(), stats=page()==='stats';
  const title= stats?'Thống kê':cat?groups[cat][0]:'Bảng công việc';
  $('#pageTitle').textContent=$('#crumbTitle').textContent=title;
  document.title=title+' · Nhịp Việc';
  $('#boardNav').classList.toggle('active',!stats&&!cat);
  $('#statsNav').classList.toggle('active',stats);
  $('#sideGroups').innerHTML=Object.entries(groups).map(([key,[name,color]])=>'<button data-group="'+key+'" class="group '+(cat===key?'active':'')+'"><span style="color:'+color+'">●</span>'+name+'<span class="count">'+tasks.filter(t=>t.category===key).length+'</span></button>').join('');
  const scope=tasks.filter(t=>!cat||t.category===cat);
  const counts=Object.fromEntries(Object.keys(labels).map(k=>[k,scope.filter(t=>t.status===k).length]));
  const pct=scope.length?Math.round(counts.done*100/scope.length):0;
  $('#progressNum').textContent=loaded?pct+'%':'—';$('#progressFill').style.width=pct+'%';
  $('#progressText').textContent=loaded?'Đã hoàn thành '+counts.done+' trên '+scope.length+' công việc.':'Đang tải công việc…';
  $('#cards').innerHTML=Object.entries(labels).map(([key,label])=>'<div class="metric '+key+'"><div><small>'+label+'</small><strong>'+(loaded?counts[key]:'—')+'</strong></div><div class="metricicon">'+icon(key)+'</div></div>').join('');
  $('#statsSection').hidden=!stats;$('#listSection').hidden=stats;
  if(stats){
    $('#statTable').innerHTML='<table><thead><tr><th>Danh mục</th><th>Tổng</th><th>Chưa làm</th><th>Đang làm</th><th>Hoàn thành</th><th>Tỷ lệ</th></tr></thead><tbody>'+Object.keys(groups).map(k=>{
      const list=tasks.filter(t=>t.category===k), nums=Object.keys(labels).map(s=>list.filter(t=>t.status===s).length);
      return '<tr><td>'+tag(k)+'</td><td>'+list.length+'</td>'+nums.map(n=>'<td>'+n+'</td>').join('')+'<td>'+(list.length?Math.round(nums[2]/list.length*100):0)+'%</td></tr>';
    }).join('')+'</tbody></table>';return;
  }
  $('#filters').innerHTML=Object.entries({all:'Tất cả',...labels}).map(([key,label])=>'<button class="filter '+(filter===key?'active':'')+'" aria-pressed="'+(filter===key)+'" data-filter="'+key+'">'+label+'</button>').join('');
  const normalize=value=>value.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
  const query=normalize($('#search').value.trim());
  const visible=scope.filter(t=>(filter==='all'||filter===t.status)&&normalize(t.title).includes(query));
  $('#tasks').innerHTML=visible.map(t=>{
    const done=t.status==='done', due=t.due_date?new Intl.DateTimeFormat('vi-VN',{day:'2-digit',month:'2-digit',year:'2-digit'}).format(new Date(t.due_date+'T12:00:00')):'Chưa đặt hạn';
    return '<article class="row" data-id="'+escapeHtml(t.id)+'"><button class="check '+(done?'done':'')+'" data-act="check" aria-label="'+(done?'Mở lại':'Hoàn thành')+' '+escapeHtml(t.title)+'" aria-pressed="'+done+'">'+(done?icon('check'):'')+'</button><div class="tasktext"><button data-act="edit" class="taskname '+(done?'done-title':'')+'">'+escapeHtml(t.title)+'</button>'+tag(t.category)+'</div><span class="date" style="font-size:11px;color:#627066;display:flex;gap:5px;align-items:center">'+icon('calendar').replace('class="svg"','class="svg" style="width:14px"')+due+'</span><select class="status '+t.status+'" aria-label="Trạng thái của '+escapeHtml(t.title)+'">'+Object.entries(labels).map(([key,label])=>'<option value="'+key+'" '+(key===t.status?'selected':'')+'>'+label+'</option>').join('')+'</select><div class="rowbuttons"><button class="icon" data-act="edit" title="Sửa công việc" aria-label="Sửa '+escapeHtml(t.title)+'">'+icon('edit')+'</button><button class="icon remove" data-act="delete" title="Xóa công việc" aria-label="Xóa '+escapeHtml(t.title)+'">'+icon('trash')+'</button></div></article>';
  }).join('')||'<div class="empty">'+(!loaded?'Đang tải…':query||filter!=='all'?'Không tìm thấy công việc phù hợp.':'Chưa có công việc. Nhấn “Thêm công việc” để bắt đầu.')+'</div>';
  $('#listFoot').textContent=loaded?'Hiển thị '+visible.length+' / '+scope.length+' công việc':'';
}
function openEditor(task){
  const form=$('#taskForm');form.reset();editing=task?.id||null;
  for(const [key,value] of Object.entries(task||{category:category()||'study',status:filter==='all'?'todo':filter})){
    if(form.elements.namedItem(key))form.elements.namedItem(key).value=value??'';
  }
  $('#formTitle').textContent=task?'Sửa công việc':'Thêm công việc';$('#editor .formerror').textContent='';$('#editor').showModal();form.elements.title.focus();
}
async function mutate(fn,success,dialog){
  if(busy)return;busy=true;
  const lock=dialog||$('#listSection');lock.inert=true;
  try{ await fn();if(dialog)dialog.close();await refresh();message(success); }
  catch(error){ if(dialog)dialog.querySelector('.formerror').textContent=error.message;else{message(error.message);await refresh();} }
  finally{busy=false;lock.inert=false;}
}
$('#newTask').onclick=()=>openEditor();$('#boardNav').onclick=()=>setRoute('board');$('#statsNav').onclick=()=>setRoute('stats');
$('#sideGroups').onclick=e=>{const b=e.target.closest('[data-group]');if(b)setRoute(b.dataset.group);};
$('#filters').onclick=e=>{if(e.target.dataset.filter){filter=e.target.dataset.filter;render();}};
$('#search').oninput=render;
$('#tasks').onclick=e=>{
  const button=e.target.closest('button');if(!button||busy)return;
  const task=tasks.find(t=>t.id===button.closest('article').dataset.id);
  switch(button.dataset.act){
    case 'edit':openEditor(task);break;
    case 'delete':deleting=task.id;$('#deleteMessage').textContent='Bạn muốn xóa “'+task.title+'”?';$('#confirm .formerror').textContent='';$('#confirm').showModal();break;
    case 'check':mutate(()=>request('/'+task.id,'PATCH',{status:task.status==='done'?'todo':'done'}),'Đã cập nhật trạng thái.');break;
  }
};
$('#tasks').onchange=e=>{if(e.target.matches('.status')){const id=e.target.closest('article').dataset.id;mutate(()=>request('/'+id,'PATCH',{status:e.target.value}),'Đã cập nhật trạng thái.');}};
$('#taskForm').onsubmit=e=>{
  e.preventDefault();const data=Object.fromEntries(new FormData(e.target));data.due_date=data.due_date||null;
  if(!data.title.trim()){$('#editor .formerror').textContent='Vui lòng nhập tên công việc.';return;}
  mutate(()=>request(editing?'/'+editing:'',editing?'PUT':'POST',data),'Đã lưu công việc.',$('#editor'));
};
$('#deleteYes').onclick=()=>mutate(()=>request('/'+deleting,'DELETE'),'Đã xóa công việc.',$('#confirm'));
document.querySelectorAll('.close').forEach(b=>b.onclick=()=>b.closest('dialog').close());
window.addEventListener('hashchange',()=>{filter='all';$('#search').value='';render();});
render();refresh();

