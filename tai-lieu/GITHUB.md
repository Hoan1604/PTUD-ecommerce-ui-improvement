# Cập nhật GitHub

Repository kế thừa Buổi 1: https://github.com/Hoan1604/PTUD-ecommerce-ui-improvement  
Nhánh: `main`  
Commit Buổi 1: `a43d5581a9fe3fa6ca2ddd81af50020a3a9e63ef`

Bản mã được chuẩn bị trên nhánh `main`, kế thừa lịch sử Buổi 1. Trạng thái push được ghi riêng trong `tai-lieu/GITHUB.md`.

## Cách cập nhật từ bản tải về không có thư mục git

Clone repository cũ về một thư mục riêng. Chép **nội dung bên trong** thư mục mã nguồn của gói nộp vào gốc repository vừa clone; index.html, css và images phải cùng cấp như hiện tại. Không tạo thêm một tầng thư mục chứa toàn bộ website.

```text
git status
git add .
git commit -m "Complete session 2 HTML5 and CSS3 practice"
git push origin main
```

Nếu không có thay đổi, Git không cần tạo commit mới. Nếu remote đã có commit mới, pull và xem khác biệt trước khi push; không dùng force push.

Mở repository sau khi push, kiểm tra README, index.html, css/style.css, bốn SVG, minh-chung và tai-lieu. Xem commit đầu nhánh để đối chiếu phiên bản. Gói ZIP nộp không mang theo thư mục `.git` hoặc node_modules.

Không khẳng định đã triển khai GitHub Pages. Trang chạy được bằng cách mở index.html sau khi tải toàn bộ mã.
