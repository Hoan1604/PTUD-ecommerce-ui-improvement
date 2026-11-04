# Thực hành cá nhân và khả năng sửa mã trực tiếp

## Thay đổi đã xác nhận

Sinh viên đã tự đổi `.product-info { padding:14px; }` thành `padding:16px` trong media query dưới 600px, sau khi nhận hướng dẫn cụ thể. Xác nhận: “Tôi vừa sửa xong thành 16px”. AI kiểm tra file đã lưu và chụp/đo trước–sau; không gọi đó là ảnh sinh viên tự gửi.

Các ảnh `minh-chung/tu-thuc-hanh/truoc-390.png`, `sau-390.png` và `ket-qua.json` giữ nguyên minh chứng đã ghi nhận ở phiên bản trước khi chuyển phần chi tiết sang trang riêng. Vì vậy chúng còn thể hiện nút Xem thông tin cũ. Ảnh giao diện cuối nằm trong `minh-chung/sau/`. Kiểm tra mới xác nhận CSS hiện vẫn là 16px dưới 600px, 20px từ 600px.

Phải sửa đúng quy tắc trong media query vì quy tắc phía sau có thể ghi đè quy tắc cơ sở. Tại 390px, thẻ 358px, border tổng 2px và padding tổng 32px để vùng chữ 324px. Điều chỉnh tăng khoảng cách trong thẻ, không đổi khoảng cách giữa các thẻ.

## Đánh giá và điều chỉnh đề xuất AI

Sinh viên yêu cầu khôi phục Mua ngay và phản hồi khoảng trắng khi mở một thẻ. Bản cuối bỏ disclosure khỏi danh sách; Xem chi tiết dẫn tới trang HTML tĩnh. Nội dung dài không còn ảnh hưởng hàng Grid. Phản hồi này được ghi ở Lượt 8 trong AI_USAGE.

## Năm tình huống sửa trực tiếp

| Yêu cầu | Vị trí | Dự đoán trước khi chạy |
|---|---|---|
| Đổi khoảng đệm thẻ | product-info, 20→24px | Mỗi bên tăng 4px; vùng chữ hẹp tổng 8px nếu width ngoài giữ nguyên; kiểm tra ghi đè mobile |
| Đổi màu giá | --price-color, ví dụ #8b3029 | Giá hiện tại đổi màu; giá cũ giữ màu riêng; kiểm tra tương phản |
| Đổi số cột | product-grid, repeat(4,...)→repeat(3,...) | Hàng đầu ba thẻ; thẻ thứ tư xuống hàng; media query vẫn có thể ghi đè |
| Đổi khoảng cách menu | nav-list, gap ngang 20→28px | Hai liên kết xa thêm 8px; có thể xuống dòng |
| Đổi alt ảnh | img của đúng sản phẩm | Nội dung thay thế rõ hơn; ảnh tải được thì bố cục nhìn thấy giữ nguyên |

Thực hiện theo thứ tự: xác định quy tắc → dự đoán → sửa → lưu → tải lại → kiểm tra 1366/768/390px và Tab/Enter. Nếu chỉ là thử nghiệm, khôi phục trước khi nộp.
