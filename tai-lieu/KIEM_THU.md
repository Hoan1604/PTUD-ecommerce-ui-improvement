# Báo cáo kiểm thử và điều chỉnh

Ngày: 04/11/2026. Người thực hiện phép thử tự động: Codex. Mã kiểm tra: `tools/kiem-tra.cjs`; dữ liệu: `minh-chung/ket-qua-kiem-thu.json`.

## Phương pháp

Chạy trang qua máy chủ HTTP cục bộ và mở lại bằng `file://`. Dùng Playwright điều khiển Chrome `156.0.8078.76`; kiểm tra bổ sung với Edge `156.0.4314.58`. Ảnh ở `truoc/` lấy từ mã Buổi 1, `sau/` từ mã cuối, `thu-nghiem/` là các thay đổi CSS tạm trong trình duyệt rồi khôi phục.

Tổng hợp: **58 đạt, 0 thất bại**. Các phép đo dưới đây áp dụng cho phiên bản đã kiểm tra; không thay cho thử trên thiết bị thật hoặc kiểm tra tiếp cận đầy đủ.

## Ma trận kích thước

| Viewport px | Số cột | Document px | Padding thẻ | Kết quả |
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

## Bảng kiểm theo đề

| Nội dung kiểm tra | Kết quả | Minh chứng hoặc cách thử |
|---|---|---|
| Trang HTML mở được | Đạt | HTTP 200; mở file trực tiếp |
| CSS được áp dụng | Đạt | CSS ngoài; Grid, màu, padding đo được |
| Hình ảnh hiển thị đúng | Đạt | 4/4 SVG tải được; alt có nội dung; khung vuông |
| Liên kết hoạt động | Đạt trong phạm vi cục bộ | Đích fragment tồn tại, menu được bấm, tệp SVG được mở |
| Bố cục không tràn nghiêm trọng | Đạt | Document width = viewport ở 9 kích thước; thẻ không tràn |
| Hover/focus hoạt động | Đạt | Màu đổi; transition 0,2s; Tab tới summary, outline 3px |
| Tự sửa ít nhất một vấn đề | Đã có xác nhận của sinh viên | Xem THUC_HANH_CA_NHAN.md; không suy ra từ kiểm thử tự động |

## Kiểm tra bổ sung

- Enter mở và Space đóng phần chi tiết; mở chi tiết tại 390 px vẫn không tràn.
- Ảnh dùng `object-fit: contain` vì SVG sản phẩm cần hiển thị đủ; aspect-ratio 1/1 bảo đảm khung vuông. `cover` có thể cắt mép hình để phủ kín nên không dùng cho bộ ảnh này.
- Không có lỗi thực thi hoặc yêu cầu tài nguyên thất bại trong lượt thử. Trang không phát sinh yêu cầu mạng ngoài khi chỉ tải giao diện.
- `prefers-reduced-motion: reduce` đưa transition về 0s.
- Tương phản trên nền #ffffff: giá cũ 3,69 → 6,13; giá hiện tại 6,18; chữ nút trắng trên nền xanh 7,66. Đây là phép tính độ sáng tương đối theo sRGB, không phải chứng nhận tuân thủ toàn bộ WCAG.
- Tại 1366 px, bốn thẻ đóng cao bằng nhau (563.66 px). Khi mở chi tiết, chiều cao tăng theo nội dung.

## Thực nghiệm Flexbox và Grid

| Thử nghiệm ở 1366 px | Giá trị quan sát |
|---|---|
| Nhóm giá `justify-content: flex-start` | Khoảng cách giữa hai mức giá 10 px |
| Đổi tạm sang `space-between` | Khoảng cách 63,05 px; hai mức giá dạt về hai đầu |
| `align-items: baseline` | Mép trên giá cũ thấp hơn 6 px để các đường cơ sở chữ thẳng nhau |
| Đổi tạm sang `flex-start` | Mép trên ngang nhau; chênh lệch 0 px |
| Grid 2 cột và 3 cột | Có ảnh thử ở cùng viewport; bản nộp khôi phục 4 cột |
| Bỏ Grid bằng `display: block` | Thẻ đầu rộng 1120 px, các thẻ lần lượt theo block |

Không lưu các style thử tạm vào HTML nộp. Ảnh so sánh padding tạm trong `thu-nghiem/` chỉ giải thích thuộc tính; ảnh thao tác cá nhân được ghi nhận riêng.

## Vấn đề và cách sửa

Các lỗi/điểm cần cải thiện đã xác định cùng nguyên nhân nằm tại `RA_SOAT_BUOI_1.md`. Không ghi thêm lỗi giả để đủ số lượng. Giá sản phẩm và tên cũ được giữ; dòng tiết kiệm lần lượt là 61.000đ, 51.000đ, 70.000đ và 20.000đ, đúng với hiệu hai mức giá.

## Chạy lại kiểm tra

Trang không cần Node.js. Riêng nếu muốn chạy công cụ minh chứng: cài Node.js và Chrome; tại thư mục repository chạy `npm install`, rồi `npm test`. Có thể chỉ định trình duyệt bằng biến môi trường `PTUD_BROWSER`, và `PTUD_EDGE` để kiểm tra bổ sung Edge. Muốn chụp lại bản trước, chạy `node tools/kiem-tra.cjs --baseline <thu-muc-ma-buoi-1>` với thư mục Buổi 1 riêng biệt.

Giới hạn: chỉ Windows/Chromium, chưa kiểm thử Safari/Firefox, điện thoại thật, trình đọc màn hình, hành vi mua hàng hoặc tải lớn. Liên kết Cỏ Mềm được đối chiếu nguồn tham khảo, không thực hiện quy trình mua hàng trên website ngoài.
