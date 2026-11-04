# Sống Xanh · Bài tập cá nhân Buổi 2

**Vũ Văn Hoàn · MSSV 31241028406**  
Học phần Phát triển ứng dụng thương mại điện tử · TS. Nguyễn Mạnh Tuấn  
Ngày hoàn thiện: 04/11/2026

Giao diện HTML5/CSS3 tiếp tục từ bài Buổi 1 trong chính repository này. Phạm vi thực hành là **danh sách bốn sản phẩm chăm sóc cá nhân và các thẻ sản phẩm**, tham khảo cách tổ chức thông tin của [Cỏ Mềm](https://comem.vn/). Sống Xanh, giá, ảnh và quy cách trong trang là dữ liệu học tập.

## Chạy giao diện

1. Tải hoặc clone repository.
2. Giữ nguyên `index.html`, `css/` và `images/` cùng cấu trúc.
3. Mở `index.html` bằng Chrome hoặc Edge. Có thể dùng Live Server trong VS Code.

Không cần cài thư viện hoặc kết nối mạng để xem trang. Liên kết tham khảo Cỏ Mềm cần mạng khi được bấm. Công cụ kiểm tra trong `tools/` là phần tùy chọn, không chạy trong trang web.

## Nội dung đã hoàn thiện

- Giữ bốn tên sản phẩm, giá gốc, giá bán và bốn SVG của Buổi 1.
- Bổ sung menu dùng `nav`, `ul`, `li`; danh sách sản phẩm dùng `ul > li > article`; tiêu đề `h1` và `h2`; các cặp thông tin dùng `dl`, `dt`, `dd`.
- Thay `href="#"` bằng liên kết mở đúng ảnh SVG. Thay nút mua chưa xử lý bằng `details/summary` mở thông tin có tác dụng thật, dùng được bằng chuột và bàn phím.
- Tách CSS trong `css/style.css`; thực hành element selector `img`, class selector `.product-card` và descendant selector `.product-card .image-link`.
- Thực hành Box Model: `padding`, `margin`, `border`, `border-radius`, `border-box`; tăng độ rõ của chữ nhóm và giá cũ.
- Flexbox cho menu, nhóm giá và nội dung thẻ; thực nghiệm `justify-content` và `align-items` có ảnh và số đo.
- CSS Grid: 4 cột từ 1024 px, 2 cột từ 600–1023 px, 1 cột dưới 600 px. Đã thử riêng 2 và 3 cột ở cùng viewport 1366 px.
- Hover có transition 0,2 giây; focus-visible có viền 3 px; thêm skip link, giảm chuyển động và không cắt bớt tên sản phẩm.
- Dòng tiết kiệm được tính đúng từ hai mức giá mẫu. Chưa triển khai giỏ hàng, thanh toán hoặc JavaScript tìm kiếm/lọc.

## Kiểm tra đã thực hiện

58 kiểm tra tự động đạt, 0 thất bại. Chrome `156.0.8078.76`; Edge `156.0.4314.58` kiểm tra bổ sung ở 1366 và 390 px.

| Chiều rộng px | Số cột | Chiều rộng tài liệu px | Padding nội dung thẻ | Kết quả |
|---:|---:|---:|---|---|
| 320 | 1 | 320 | 16px | Đạt |
| 360 | 1 | 360 | 16px | Đạt |
| 390 | 1 | 390 | 16px | Đạt |
| 599 | 1 | 599 | 16px | Đạt |
| 600 | 2 | 600 | 20px | Đạt |
| 768 | 2 | 768 | 20px | Đạt |
| 1023 | 2 | 1023 | 20px | Đạt |
| 1024 | 4 | 1024 | 20px | Đạt |
| 1366 | 4 | 1366 | 20px | Đạt |

Đã thử tải CSS, bốn ảnh, liên kết nội trang và liên kết SVG; Tab, Enter, Space, hover, mở HTML trực tiếp và thiết lập giảm chuyển động. Giới hạn: môi trường Windows, trình duyệt dựa trên Chromium; chưa thử Safari, Firefox, điện thoại vật lý hoặc trình đọc màn hình. Chi tiết tại [KIEM_THU.md](tai-lieu/KIEM_THU.md).

## Ảnh trước và sau

Ảnh trước chụp từ chính mã nguồn Buổi 1 tại commit `a43d558`; ảnh sau chụp từ bản Buổi 2. Cùng chiều rộng 390 px, thẻ chuyển từ 175 px sang 358 px nhờ đổi từ hai cột thành một cột.

| Buổi 1 tại 390 px | Buổi 2 tại 390 px |
|---|---|
| ![Thẻ trước](minh-chung/truoc/the-san-pham-390.png) | ![Thẻ sau](minh-chung/sau/the-san-pham-390.png) |

[Giao diện máy tính](minh-chung/sau/toan-trang-1366.png) · [Máy tính bảng](minh-chung/sau/toan-trang-768.png) · [Điện thoại](minh-chung/sau/toan-trang-390.png)

## Tài liệu đối chiếu

- [Rà soát Buổi 1 và hướng cải tiến](tai-lieu/RA_SOAT_BUOI_1.md)
- [Báo cáo sử dụng AI](AI_USAGE.md)
- [Kết quả kiểm thử](tai-lieu/KIEM_THU.md) và [dữ liệu máy đọc](minh-chung/ket-qua-kiem-thu.json)
- [Bảy câu hỏi kiến thức](tai-lieu/CAU_HOI_KIEN_THUC.md)
- [Thực hành cá nhân và sửa mã trực tiếp](tai-lieu/THUC_HANH_CA_NHAN.md)
- [Đối chiếu từng yêu cầu của đề](tai-lieu/DOI_CHIEU_YEU_CAU.md)
- [Hướng dẫn và trạng thái GitHub](tai-lieu/GITHUB.md)
- [Nguồn tham khảo](tai-lieu/TAI_LIEU_THAM_KHAO.md)

## AI và thực hành cá nhân

Codex hỗ trợ phân tích, sửa HTML/CSS, thực nghiệm trên trình duyệt, chụp ảnh và biên soạn báo cáo. Prompt và nội dung kiểm tra được ghi trong `AI_USAGE.md`; không gọi các nhóm công việc biên tập là những tin nhắn đã gửi riêng biệt.

Sinh viên xác nhận “Tôi vừa sửa xong thành 16px”. AI đối chiếu file đã lưu, kiểm tra lại bản mã đồng bộ và chụp ảnh trước/sau từ hai trạng thái mã. Thao tác sửa CSS do sinh viên thực hiện; số đo và ảnh trong bộ bài do AI thực hiện.

## Repository

[Hoan1604/PTUD-ecommerce-ui-improvement](https://github.com/Hoan1604/PTUD-ecommerce-ui-improvement) · nhánh `main`. Đã push lên nhánh `main` và đối chiếu mã commit trên máy với GitHub.

Không có xác nhận triển khai GitHub Pages trong bộ bài này.
