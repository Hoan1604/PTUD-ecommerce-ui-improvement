# Thực hành cá nhân và chuẩn bị sửa mã trực tiếp

## Thay đổi được chọn

Trong bản Buổi 2 trước bước thực hành, `.product-info` ở media query dưới 600 px có padding 14 px. Thử tăng thành 16 px giúp chữ cách viền thẻ thoáng hơn. Đây là điều chỉnh khoảng cách trình bày, không phải lỗi chức năng nghiêm trọng.

```css
/* Trong @media (max-width: 599px) */
/* Trước */
.product-info { padding: 14px; }
/* Sau */
.product-info { padding: 16px; }
```

Phải sửa quy tắc trong media query vì mục tiêu là điện thoại; quy tắc cơ sở 20 px trên máy tính được giữ. Nếu chỉ sửa quy tắc cơ sở, quy tắc 14 px phía sau vẫn có thể ghi đè ở màn hình nhỏ.

## Thao tác và ghi nhận

1. Mở `css/style.css` trong VS Code hoặc Notepad, tìm padding 14px gần cuối file.
2. Chỉ đổi thành 16px trong media query dưới 600px; lưu bằng Ctrl+S.
3. Mở `index.html` trong Chrome, tải lại Ctrl+R; F12 và Ctrl+Shift+M, chọn Responsive và nhập chiều rộng 390.
4. Quan sát khoảng cách chữ tới viền và bấm Xem thông tin; chụp ảnh sau sửa.
5. Đối chiếu: 390px vẫn một cột; không tràn ngang; từ 600px trở lên padding cơ sở vẫn 20px.

**Ghi nhận:** Sinh viên xác nhận “Tôi vừa sửa xong thành 16px”. AI đối chiếu file đã lưu, kiểm tra lại bản mã đồng bộ và chụp ảnh trước/sau từ hai trạng thái mã. Thao tác sửa CSS do sinh viên thực hiện; số đo và ảnh trong bộ bài do AI thực hiện.

Ảnh `minh-chung/tu-thuc-hanh/truoc-390.png` là ảnh do AI chụp từ bản CSS 14px thật trước khi gửi hướng dẫn. Ảnh `sau-390.png` được AI chụp lại sau khi bản mã 16px đã được xác nhận; không gọi đây là ảnh sinh viên tự gửi. Các ảnh CSS ghi đè tạm nằm trong `thu-nghiem/` và không dùng làm bằng chứng thao tác cá nhân.

## Năm yêu cầu sửa mã giảng viên có thể chọn

| Yêu cầu | Vị trí cần sửa | Ví dụ và dự đoán |
|---|---|---|
| Khoảng cách bên trong thẻ | `.product-info` | 20px → 24px: vùng chữ hẹp đi 8px tổng cộng, đệm tăng 4px mỗi bên; kiểm tra ghi đè trên điện thoại |
| Màu giá sản phẩm | `--price-color` ở `:root` | Đổi sang #8b3029; kiểm tra độ rõ trên nền trắng và tránh sửa giá cũ |
| Số cột danh sách | `.product-grid` và media query | repeat(4, ...) → repeat(3, ...): ở máy tính có ba thẻ hàng đầu; mốc responsive vẫn có thể ghi đè |
| Khoảng cách menu | `.nav-list` | gap ngang 20px → 28px: các liên kết xa nhau hơn; có thể xuống hàng khi thiếu chỗ |
| Alt ảnh | img trong article tương ứng | Bổ sung loại sản phẩm và màu phù hợp hình; không làm thay đổi bố cục nhìn thấy |

Sau mỗi thay đổi: dự đoán → lưu → tải lại → kiểm tra 1366/768/390 px → Tab và thử liên kết. Khôi phục nếu đó chỉ là phép thử.
