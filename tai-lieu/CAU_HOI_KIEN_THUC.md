# Trả lời bảy câu hỏi kiến thức

## Câu 1 Các phần tử HTML5 trong khu vực đã chọn

`header` chứa thương hiệu và điều hướng; `nav` xác định nhóm liên kết di chuyển trong trang; `main` chứa nội dung chính duy nhất. `section#san-pham` nhóm danh sách có tiêu đề h1; section giới thiệu có h2. Mỗi sản phẩm dùng `article` vì là một đơn vị nội dung có tên, ảnh, giá và thông tin riêng. `ul > li` mô tả tập hợp bốn sản phẩm; các tên sản phẩm dùng h2 dưới h1. `footer` ghi thông tin bài học. `details/summary` mở/đóng thông tin không cần JavaScript; `dl/dt/dd` mô tả quy cách và mã mẫu. `div` chỉ nhóm các phần để trình bày, không thay thế ý nghĩa của nav hoặc article.

## Câu 2 Margin và padding

Padding là khoảng cách từ nội dung tới mép trong của phần tử; margin là khoảng cách ngoài phần tử. `.product-info` có padding 20 px trên máy tính. `.product-description` có margin `8px 0 16px`, tạo khoảng cách bên ngoài đoạn mô tả với phần trước và nhóm giá. Khoảng cách giữa các thẻ do Grid gap 22 px tạo ra, không phải padding của từng thẻ. `.product-card` có border 1 px và border-radius 14 px. Quy tắc `box-sizing: border-box` làm width bao gồm padding và border của chính phần tử; margin nằm ngoài. Không được cộng border của article vào width của div nội dung như thể chúng là cùng một phần tử.

## Câu 3 Flexbox dùng ở đâu

Menu `.nav-list`, nhóm `.product-prices`, `.header-inner` và nội dung `.product-info` dùng Flexbox. Với nhóm giá theo hàng, `justify-content: flex-start` gom giá về đầu trục chính; `align-items: baseline` căn đường cơ sở chữ dù giá hiện tại 20 px và giá cũ 14 px. Gap ngang là 10 px, flex-wrap cho phép xuống hàng. Thử space-between ở 1366 px làm khoảng cách giữa hai mức giá tăng từ 10 lên 63,05 px; bản nộp giữ flex-start để hai giá liên quan được nhóm gần nhau. Với `.product-info` có flex-direction: column, trục chính đổi sang dọc; margin-top: auto trên price-block đẩy nhóm giá về cuối phần nội dung, giúp các thẻ đóng căn đều.

## Câu 4 Grid khác Flexbox thế nào

Flexbox chủ yếu bố trí theo một chiều tại một thời điểm; Grid định nghĩa hệ hàng và cột. Vì cần các thẻ cùng số cột và khoảng cách nhất quán, `.product-grid` dùng Grid với repeat và minmax. Các nhóm nhỏ bên trong như menu và giá dùng Flexbox. Đây là cách kết hợp, không phải chỉ được chọn một trong hai. Bản cuối có 4/2/1 cột theo viewport; đã thử 2 và 3 cột ở cùng 1366 px để quan sát.

## Câu 5 Nếu xóa display grid

Nếu không có quy tắc khác tiếp tục đặt display: grid, ul.product-grid trở về block. Các li chứa article lần lượt xếp dọc, không còn các track 4 cột; grid-template-columns không tạo cột trong bố cục block. Trong phép thử tạm đặt display: block tại 1366 px, thẻ đầu rộng 1120 px bằng vùng chứa, thay vì 263,5 px. Gap của Grid không tạo khoảng cách hàng/cột như trước. Thử nghiệm được khôi phục sau khi đo, không làm thay đổi bản nộp.

## Câu 6 Vì sao ảnh cần alt

Ảnh sản phẩm mang thông tin, nên alt cung cấp mô tả thay thế khi ảnh không tải và hỗ trợ người dùng trình đọc màn hình. Ví dụ: “Chai tinh chất dưỡng da màu xanh nhạt”. Alt cần phù hợp nội dung ảnh, không dùng tên tệp hoặc nhồi từ khóa. Liên kết bao ảnh có aria-label mô tả hành động mở ảnh; hai mục đích này được phân biệt. Ảnh trang trí thuần túy có thể dùng alt rỗng, nhưng bốn ảnh sản phẩm trong bài đều có ý nghĩa nên giữ mô tả.

## Câu 7 Một đề xuất AI đã được kiểm tra hoặc điều chỉnh

Đề xuất thay nút “Mua ngay” chưa có xử lý được đối chiếu với phạm vi HTML/CSS của Buổi 2. Phương án được chọn là details/summary để mở thông tin, thay vì tạo thao tác đặt hàng không hoạt động. Kết quả đã được kiểm tra bằng chuột, Tab, Enter và Space trên bản mã cuối; thông tin mở/đóng được và có focus-visible. Phép kiểm tra tự động do AI thực hiện, ghi tại ket-qua-kiem-thu.json. Phần sinh viên tự điều chỉnh padding và xác nhận thao tác được ghi riêng trong THUC_HANH_CA_NHAN.md, không nhập chung với kết quả tự động.
