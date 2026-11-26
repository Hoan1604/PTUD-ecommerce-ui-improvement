# Nhịp Việc – TODO app
## Chạy trên máy
1. Giải nén toàn bộ thư mục. Mở thư mục chứa `server.mjs` bằng VS Code.
2. Cài Node.js 22.13 trở lên nếu máy chưa có. Trong Terminal, kiểm tra bằng `node -v`.
3. Chạy `node server.mjs`, sau đó mở http://127.0.0.1:3017. Nhấn Ctrl+C trong Terminal để dừng.
4. Ứng dụng dùng các thư viện có sẵn của Node.js. Dữ liệu được lưu trong `data/todo.sqlite`. Khi khởi động lại, ứng dụng tiếp tục dùng cùng tệp.

## Giao diện và chức năng
- **Bảng công việc** có tỷ lệ hoàn thành, ba thẻ số lượng theo trạng thái, danh sách và bộ lọc. Nhấn một danh mục ở menu để xem riêng Học tập, Công việc hoặc Cá nhân.
- **Thêm hoặc sửa**. Nhấn Thêm công việc, nhập tên, mô tả, danh mục, trạng thái và ngày đến hạn. Tên là bắt buộc. Bấm vào tên hoặc biểu tượng bút để xem chi tiết và sửa.
- **Trạng thái**. Chọn Chưa làm, Đang làm hoặc Hoàn thành ở từng dòng. Ô đánh dấu bên trái cho phép hoàn thành nhanh. Bỏ dấu để chuyển về Chưa làm.
- **Xóa**. Nhấn biểu tượng thùng rác và xác nhận tên công việc.
- **Thống kê**. Số lượng được tính từ các bản ghi hiện tại. Tỷ lệ = số việc hoàn thành / tổng số việc × 100%, làm tròn đến số nguyên. Khi danh sách trống, tỷ lệ là 0%. Trang Thống kê phân tích theo từng danh mục. Bộ lọc tìm kiếm chỉ tác động đến danh sách trên bảng công việc.

## Cơ sở dữ liệu
SQLite được tạo từ `drizzle/0000_tasks.sql`. Bảng `tasks` lưu thông tin nghiệp vụ. Bảng `app_settings` ghi nhận việc khởi tạo sáu công việc mẫu một lần. Khi xóa hết dữ liệu mẫu, danh sách tiếp tục trống sau khi tải lại.

| Cột của tasks | Kiểu | Ý nghĩa |
| --- | --- | --- |
| id | TEXT, khóa chính | Mã phân biệt công việc |
| title | TEXT | Tên bắt buộc, tối đa 120 ký tự |
| description | TEXT | Nội dung chi tiết, tối đa 1.200 ký tự |
| category | TEXT | study, work hoặc personal |
| status | TEXT | todo, doing hoặc done |
| due_date | TEXT, có thể trống | Ngày đến hạn theo YYYY-MM-DD |
| created_at, updated_at | TEXT | Thời điểm tạo và cập nhật theo ISO 8601 |

Để minh chứng database, mở `data/todo.sqlite` bằng DB Browser for SQLite, chọn **Browse Data → tasks**. Có thể dùng tab **Execute SQL** để đối chiếu với giao diện:

```sql
SELECT title, category, status, due_date FROM tasks ORDER BY created_at DESC;
SELECT status, COUNT(*) AS so_cong_viec FROM tasks GROUP BY status;
```

## Trình bày bài tập
1. Mở bảng công việc, giới thiệu các danh mục và ba trạng thái.
2. Thêm “Chuẩn bị slide thuyết trình”, chọn danh mục Học tập. Kiểm tra số việc Chưa làm tăng một.
3. Sửa tên và hạn nộp. Đổi từ Chưa làm sang Đang làm rồi sang Hoàn thành. Mở trang Thống kê và đối chiếu dòng Học tập.
4. Tải lại trang hoặc khởi động lại server để minh chứng dữ liệu được lưu. Mở database và tìm bản ghi vừa tạo.
5. Xóa công việc thử, xác nhận và kiểm tra tổng số việc trở về ban đầu.

## Cấu trúc
- `public/` chứa HTML, CSS và JavaScript của giao diện.
- `app.mjs` xử lý API và kiểm tra dữ liệu. GET/POST áp dụng cho /api/tasks. PUT, PATCH và DELETE áp dụng cho /api/tasks/{id}.
- `server.mjs` chạy máy chủ HTTP trên máy và kết nối SQLite.
- `data/todo.sqlite` là database có thể mở trực tiếp.
- `drizzle/0000_tasks.sql` chứa cấu trúc bảng.


## Hình minh chứng
Trong thư mục Minh_chung có ba ảnh chụp từ hệ thống đang chạy: bảng công việc, biểu mẫu thêm việc và trang thống kê.

