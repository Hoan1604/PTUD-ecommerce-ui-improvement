const statuses = ['todo', 'doing', 'done'];
const categories = ['study', 'work', 'personal'];
const insert = 'INSERT INTO tasks (id,title,description,category,status,due_date,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)';
const sample = [
 ['Hoàn thiện báo cáo dự án nhóm 7','Rà soát số liệu và bổ sung minh chứng cho chương 3.','study','doing',0],
 ['Thiết kế giao diện TODO app','Hoàn thiện bố cục danh sách và biểu mẫu thêm công việc.','work','doing',1],
 ['Ôn tập môn Thương mại điện tử','Tổng hợp nội dung trọng tâm trước buổi học.','study','todo',2],
 ['Lên kế hoạch cho tuần mới','Sắp xếp lịch học và các công việc cá nhân.','personal','todo',3],
 ['Chuẩn bị slide thuyết trình','Chọn hình minh họa và phân công phần trình bày.','study','done',-1],
 ['Đối soát đơn hàng trong tuần','Kiểm tra số lượng đơn và doanh thu theo sổ theo dõi.','work','done',-2]
];
async function initialize(db) {
  if (await db.prepare("SELECT value FROM app_settings WHERE name='initialized'").first()) return;
  const now = new Date().toISOString();
  const date = new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Ho_Chi_Minh'}).format(new Date());
  const statements = sample.map(([title,desc,group,status,offset],i) => {
    const due = new Date(date+'T12:00:00Z');
    due.setUTCDate(due.getUTCDate()+offset);
    const time = new Date(Date.parse(now)-i*1000).toISOString();
    return db.prepare("INSERT OR IGNORE INTO tasks (id,title,description,category,status,due_date,created_at,updated_at) SELECT ?,?,?,?,?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM app_settings WHERE name='initialized')").bind('sample-'+i,title,desc,group,status,due.toISOString().slice(0,10),time,time);
  });
  await db.batch([...statements,db.prepare("INSERT OR IGNORE INTO app_settings VALUES ('initialized','1')")]);
}
const reply = (value,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'no-store'}});
function validate(data) {
  if (!data || typeof data.title!=='string' || !data.title.trim() || data.title.trim().length>120) return 'Tên công việc cần có từ 1 đến 120 ký tự.';
  if (typeof data.description!=='string' || data.description.length>1200) return 'Mô tả tối đa 1.200 ký tự.';
  if (!categories.includes(data.category) || !statuses.includes(data.status)) return 'Danh mục hoặc trạng thái chưa hợp lệ.';
  if (data.due_date!==null) {
    if (typeof data.due_date!=='string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.due_date)) return 'Ngày đến hạn chưa hợp lệ.';
    const date = new Date(data.due_date+'T12:00:00Z');
    if (!Number.isFinite(+date) || date.toISOString().slice(0,10)!==data.due_date) return 'Ngày đến hạn chưa hợp lệ.';
  }
}
export async function api(request, db) {
  const path = new URL(request.url).pathname;
  const match = /^\/api\/tasks(?:\/([\w-]+))?$/.exec(path);
  if (!match) return reply({error:'Đường dẫn không tồn tại.'},404);
  const [,id] = match, method=request.method;
  const origin = request.headers.get('origin');
  if (method!=='GET' && origin && origin!==new URL(request.url).origin) return reply({error:'Yêu cầu khác nguồn.'},403);
  await initialize(db);
  if (!id && method==='GET') {
    const {results} = await db.prepare('SELECT * FROM tasks ORDER BY created_at DESC,id').all();
    return reply(results);
  }
  if (id && !await db.prepare('SELECT id FROM tasks WHERE id=?').bind(id).first()) return reply({error:'Công việc đã bị xóa.'},404);
  if (id && method==='DELETE') {
    await db.prepare('DELETE FROM tasks WHERE id=?').bind(id).run();
    return reply({id});
  }
  if (!(id ? ['PUT','PATCH'] : ['POST']).includes(method)) return reply({error:'Phương thức chưa được hỗ trợ.'},405);
  if (!request.headers.get('content-type')?.includes('application/json')) return reply({error:'Cần dữ liệu JSON.'},415);
  let data;
  try { data=await request.json(); } catch { return reply({error:'Dữ liệu gửi lên không hợp lệ.'},400); }
  const now = new Date().toISOString();
  if (method==='PATCH') {
    if (!statuses.includes(data?.status)) return reply({error:'Trạng thái chưa hợp lệ.'},400);
    await db.prepare('UPDATE tasks SET status=?,updated_at=? WHERE id=?').bind(data.status,now,id).run();
    return reply({id});
  }
  const error=validate(data);
  if (error) return reply({error},400);
  const values=[data.title.trim(),data.description.trim(),data.category,data.status,data.due_date];
  if (id) {
    await db.prepare('UPDATE tasks SET title=?,description=?,category=?,status=?,due_date=?,updated_at=? WHERE id=?').bind(...values,now,id).run();
    return reply({id});
  }
  const key=crypto.randomUUID();
  await db.prepare(insert).bind(key,...values,now,now).run();
  return reply({id:key},201);
}
