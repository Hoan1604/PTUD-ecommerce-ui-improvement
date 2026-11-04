# Báo cáo kiểm thử bản cập nhật

Ngày 04/11/2026. Phép thử và ảnh do Codex thực hiện bằng Playwright trên Windows. Chrome 156.0.8078.76; Edge 156.0.4314.58. Kết quả **97 đạt, 0 thất bại**. Mã kiểm tra: tools/kiem-tra.cjs; dữ liệu gốc: minh-chung/ket-qua-kiem-thu.json.

## Danh sách sản phẩm

| Viewport px | Cột | Document px | Padding |
|---:|---:|---:|---|
| 320 | 1 | 320 | 16px |
| 360 | 1 | 360 | 16px |
| 390 | 1 | 390 | 16px |
| 599 | 1 | 599 | 16px |
| 600 | 2 | 600 | 20px |
| 768 | 2 | 768 | 20px |
| 1023 | 2 | 1023 | 20px |
| 1024 | 4 | 1024 | 20px |
| 1366 | 4 | 1366 | 20px |

Đã kiểm tra HTTP 200, CSS ngoài, bốn ảnh/alt, ID và đích liên kết, không script/inline CSS, menu, nút Mua ngay, hover, transition 0,2s, focus-visible 3px và Enter trên liên kết Xem chi tiết. Mua ngay là CTA minh họa, không gửi đơn.

## Trang chi tiết

Bốn trang san-pham/tinh-chat.html, sua-rua-mat.html, kem-duong.html, xa-phong.html đều có ảnh, tên, hai mức giá, mô tả, bốn cặp thông tin và liên kết quay lại. Mỗi trang được kiểm tra tại 1366, 768, 390, 320px: 16 trường hợp; lưới hai cột từ 768px, một cột dưới 768px; không tràn ngang. CSS và ảnh tải được cả qua HTTP và file://. Liên kết Mở ảnh gốc tải đúng SVG.

## Kiểm tra hồi quy khoảng trắng

| Đại lượng tại 1366px | Bản sổ xuống trước sửa | Bản cuối |
|---|---:|---:|
| Chiều cao bốn thẻ khi tương tác | 774,44px | 619,66px |
| Khoảng cách mô tả–giá ở thẻ đầu | 16px | 16px |
| Khoảng cách mô tả–giá ở ba thẻ bên cạnh | 226,78px | 16px |
| Nội dung chi tiết trong hàng Grid | Có disclosure mở | Không; điều hướng trang riêng |

Đã so sánh chiều cao và vị trí giá trước khi đi trang chi tiết và sau khi bấm Quay lại danh sách: không thay đổi. Ảnh trước/sau ở minh-chung/dieu-chinh-giao-dien.

## Bảng kiểm theo đề

| Nội dung | Kết quả | Căn cứ |
|---|---|---|
| HTML mở được | Đạt | HTTP và mở file cho trang gốc/trang chi tiết |
| CSS được áp dụng | Đạt | Đường dẫn đúng, computed style khớp |
| Ảnh hiển thị | Đạt | Bốn SVG giữ tỷ lệ và có alt |
| Liên kết hoạt động | Đạt cục bộ | Chi tiết, quay lại, SVG và fragment |
| Bố cục không tràn | Đạt trong trường hợp thử | Chín viewport danh sách, 16 trường hợp chi tiết |
| Hover/focus | Đạt | Nút mua, Tab, outline; Enter mở liên kết |
| Sinh viên tự sửa | Đã xác nhận | Padding 14→16px; minh chứng lịch sử riêng |

## Thực nghiệm và giới hạn

Flex-start tạo khoảng cách hai giá 10px; space-between tạo 63,05px. Baseline cho chênh mép trên 6px; flex-start 0px. Đã thử Grid hai/ba cột và tạm display:block; bản nộp khôi phục cấu hình cuối. Tương phản chữ trên trắng: giá cũ 6,13; giá hiện tại 6,18; chữ trắng trên nút xanh 7,66. Khi giảm chuyển động, transition bằng 0s.

Không có lỗi thực thi hoặc yêu cầu tài nguyên thất bại trong lượt thử; không phát sinh tải tài nguyên mạng ngoài khi xem giao diện. Chưa thử Firefox/Safari, điện thoại thật, trình đọc màn hình, giao dịch mua hàng hoặc tải lớn; không coi phép đo màu là chứng nhận toàn bộ WCAG.

Chạy lại: `npm install`, `npm test` nếu cần công cụ kiểm tra. Trang giao diện không cần Node.js để mở. Ảnh thực hành cá nhân từ bản trước được giữ nguyên, không gọi đó là ảnh giao diện cuối.
