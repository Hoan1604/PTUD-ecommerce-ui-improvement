# Trả lời bảy câu hỏi kiến thức

## Câu 1 Các phần tử HTML5 và lý do sử dụng

Header chứa thương hiệu và nav; main chứa nội dung chính duy nhất. Section nhóm danh sách theo h1; mỗi sản phẩm là article có h2 riêng và aria-labelledby. Ul/li mô tả tập hợp sản phẩm và menu. Footer ghi thông tin bài học. Trang chi tiết dùng figure/figcaption cho ảnh và dl/dt/dd cho các cặp thông tin. A dùng để điều hướng Xem chi tiết, Quay lại hoặc Mở ảnh gốc; button type="button" giữ CTA Mua ngay minh họa. Div chỉ nhóm nội dung phục vụ bố cục. Mỗi trang chi tiết có h1 là tên sản phẩm, các mục mô tả/thông tin dùng h2.

## Câu 2 Margin và padding trên thẻ sản phẩm

Padding là khoảng cách trong phần tử; margin nằm ngoài phần tử. Product-info có padding 20px trên máy tính và 16px dưới 600px. Product-description có margin 8px 0 16px, tách mô tả khỏi tên và nhóm giá. Khoảng cách giữa các thẻ do gap của Grid quản lý. Article có border 1px và bo góc 14px. Border-box đưa padding và border của chính phần tử vào width; margin vẫn ở ngoài. Với thẻ 263,5px, vùng trong border là 261,5px và vùng chữ sau padding ngang còn 221,5px.

## Câu 3 Flexbox được dùng ở đâu

Product-prices sắp giá theo hàng với justify-content:flex-start, align-items:baseline, gap ngang 10px và flex-wrap:wrap. Justify-content điều khiển trục chính; align-items điều khiển căn chỉnh theo trục phụ. Baseline giúp hai cỡ chữ 20/14px có đường cơ sở thẳng nhau. Thử space-between làm khoảng cách tăng lên 63,05px nên bản cuối giữ flex-start. Product-actions dùng flex-direction:column và gap:10px cho Mua ngay/Xem chi tiết; lúc này trục chính theo chiều dọc. Menu và nội dung thẻ cũng dùng Flexbox.

## Câu 4 Grid khác Flexbox như thế nào

Flexbox chủ yếu bố trí theo một chiều tại một thời điểm; Grid định nghĩa hàng và cột. Danh sách cần số cột thống nhất nên dùng Grid 4/2/1 theo viewport. Nhóm giá và nút nhỏ dùng Flexbox. Grid hai cột trên trang chi tiết bố trí ảnh cạnh thông tin; dưới 768px chuyển một cột. Hai kỹ thuật bổ sung cho nhau. Đã thử hai/ba cột ở cùng 1366px để quan sát thay vì chỉ chép cấu hình.

## Câu 5 Điều gì xảy ra nếu bỏ display grid

Nếu không có quy tắc khác đặt Grid, ul.product-grid trở về bố cục block. Các li/article xếp lần lượt theo chiều dọc; grid-template-columns không còn tạo track cột. Trong phép thử display:block ở 1366px, thẻ đầu rộng 1120px thay vì 263,5px. Gap của Grid không tạo khoảng cách hàng/cột như trước. Đây là phép thử tạm; cấu hình Grid đã được khôi phục trước khi nộp.

## Câu 6 Vì sao ảnh cần alt

Ảnh sản phẩm có ý nghĩa nên alt mô tả nội dung thay thế khi ảnh không tải và hỗ trợ người dùng trình đọc màn hình. Ví dụ “Chai tinh chất dưỡng da màu xanh nhạt”. Alt cần đúng ảnh, không dùng tên tệp hoặc nhồi từ khóa. Aria-label của liên kết ảnh mô tả hành động xem chi tiết; alt mô tả hình. Ảnh trang trí thuần túy có thể alt rỗng nhưng bốn ảnh sản phẩm trong bài không phải trường hợp đó.

## Câu 7 Đề xuất AI đã được kiểm tra hoặc điều chỉnh

Phương án AI thay nút Mua ngay bằng phần Xem thông tin sổ xuống được điều chỉnh sau khi xem giao diện. Sinh viên yêu cầu giữ Mua ngay và chỉ ra khoảng trắng ở các thẻ bên cạnh khi mở thông tin. Bản cuối khôi phục CTA chính và dùng liên kết Xem chi tiết tới trang HTML có ảnh, mô tả và quy cách. AI đo được khoảng trống giảm từ 226,78px xuống 16px và kiểm tra đi trang chi tiết/quay lại không đổi chiều cao hàng. Ngoài ra, sinh viên đã xác nhận tự sửa padding điện thoại 14→16px; ảnh và phép đo do AI thực hiện được ghi riêng.
