AI Usage Log
1. Công cụ AI
- Tên công cụ: ChatGPT
- Mục đích chung: Hỗ trợ phân tích trải nghiệm người dùng, đề xuất thiết kế giao diện, tạo và giải thích mã HTML/CSS trong quá trình thực hiện bài tập.
2. Mục đích sử dụng
ChatGPT được sử dụng ở các bước sau:
1. Hỗ trợ lập khung phân tích năm khu vực của website Cỏ Mềm: trang chủ, danh mục sản phẩm, chi tiết sản phẩm, tìm kiếm và giỏ hàng.
2. Đề xuất phương án thiết kế lại thẻ sản phẩm bằng HTML5 và CSS3.
3. Tạo bản nháp mã nguồn cho index.html và style.css, đồng thời giải thích cách chạy và kiểm tra giao diện.
4. Hướng dẫn chỉnh sửa nút CTA “Mua ngay” và bổ sung giá gốc bên cạnh giá sau giảm.
5. Giải thích vai trò của các class và thuộc tính CSS liên quan đến bố cục, màu sắc, chữ và hiệu ứng tương tác.
3. Prompt đã sử dụng
Các prompt dưới đây được tóm tắt theo nội dung đã dùng trong quá trình làm bài.
Prompt 1 — Phân tích UX website tham khảo
Bạn là chuyên gia phân tích nghiệp vụ và thiết kế trải nghiệm người dùng cho website thương mại điện tử. Tôi đang khảo sát website Cỏ Mềm (https://comem.vn/). Hãy lập bảng phân tích năm khu vực: trang chủ, danh mục sản phẩm, chi tiết sản phẩm, tìm kiếm và giỏ hàng. Với mỗi khu vực, nêu mục đích, thành phần giao diện, điểm thuận tiện, một vấn đề có thể phát sinh và một đề xuất cải tiến. Không khẳng định tính năng chưa được kiểm chứng; phân biệt quan sát thực tế với đề xuất AI; ghi rõ nội dung cần kiểm tra trực tiếp và không bịa dữ liệu.

Prompt 2 — Đề xuất phương án thiết kế thẻ sản phẩm
Tôi muốn cải tiến giao diện thẻ sản phẩm trên website thương mại điện tử bằng HTML5 và CSS3. Thiết kế cần trình bày hình ảnh, tên sản phẩm, giá bán và nút mua hàng rõ ràng, nhất quán, phù hợp với máy tính và điện thoại. Phạm vi chỉ gồm giao diện, tối thiểu bốn sản phẩm mẫu, CSS trong file riêng, không có backend, cơ sở dữ liệu, đăng nhập hoặc thanh toán thực tế. Hãy đề xuất bố cục, cách sắp xếp thành phần, màu sắc, kích thước, responsive, cấu trúc HTML/CSS và tiêu chí kiểm tra. Trước tiên chỉ giải thích phương án, chưa tạo toàn bộ mã nguồn.

Prompt 3 — Tạo mã nguồn HTML/CSS
Dựa trên phương án thiết kế thẻ sản phẩm dạng dọc đã thống nhất, hãy tạo giao diện thương mại điện tử bằng HTML5 và CSS3. Có tiêu đề trang và tối thiểu bốn sản phẩm mẫu; mỗi sản phẩm có ảnh, tên, giá và nút mua hàng; các thẻ nhất quán; giá và nút dễ nhận biết; ảnh không méo; giao diện responsive và không tràn nội dung. Tách mã vào index.html và style.css, liên kết bằng đường dẫn tương đối, sử dụng thẻ HTML phù hợp, không dùng backend hoặc giả lập thanh toán. Giải thích mã, hướng dẫn chạy trên Chrome và chỉ ra vị trí có thể tự điều chỉnh.

Prompt 4 — Điều chỉnh CTA và hiển thị giá
Tôi muốn nút CTA “Mua ngay” nổi bật hơn, có màu phát sáng hơn và thay đổi màu rõ ràng khi di chuột vào. Đồng thời, bổ sung giá bán sau giảm và giá gốc được gạch ngang, tương tự minh họa. Hãy hướng dẫn sửa ở đâu, thay thế đoạn nào và giải thích vai trò của các thành phần HTML/CSS đã chỉnh sửa.

Lưu ý: Các prompt trên được biên tập gọn để dễ đọc; nếu giảng viên yêu cầu nhật ký nguyên văn, hãy thay bằng nội dung prompt đầy đủ trong tài liệu bài tập.
4. Kết quả AI đề xuất
- Khung phân tích UX cho năm khu vực của website tham khảo, bao gồm điểm thuận tiện, rủi ro có thể phát sinh và hướng cải tiến.
- Phương án tổ chức thẻ sản phẩm với hình ảnh, tên, giá và nút thao tác được sắp xếp theo thứ tự trực quan.
- Bản nháp HTML cho cấu trúc trang và các thẻ sản phẩm; bản nháp CSS cho bố cục, kiểu chữ, màu sắc và hiển thị responsive.
- Hướng dẫn tạo hiệu ứng hover cho CTA và cách hiển thị đồng thời giá bán sau giảm với giá gốc bị gạch ngang.
- Giải thích các thành phần như product-prices, product-price, old-price, display: flex và text-decoration: line-through.
Đây là các đề xuất và bản nháp hỗ trợ thực hiện; kết quả cần được kiểm tra trong mã nguồn và trên trình duyệt.
5. Kiểm tra và điều chỉnh
Kiểm tra phân tích UX
Sau khi đối chiếu với website Cỏ Mềm, người thực hiện nhận thấy một số nhận định của AI chưa khớp với quan sát thực tế:
- Trang chủ: Phần phân tích được giữ lại theo đánh giá trong tài liệu bài tập.
- Danh mục sản phẩm: Nhận định rằng các điều kiện lọc chưa được hiển thị rõ được đánh giá là không chính xác; phần nhận định này được điều chỉnh, các nội dung phù hợp khác được giữ lại.
- Chi tiết sản phẩm: Nhận định nút mua chưa rõ ràng bị loại bỏ vì nút đã dễ nhận biết. Nhận định về sản phẩm liên quan được điều chỉnh: có sản phẩm liên quan nhưng mức độ đa dạng chưa cao.
- Tìm kiếm: Nhận định rằng tìm kiếm không xử lý được lỗi chính tả bị loại bỏ vì quan sát thực tế cho thấy chức năng có hỗ trợ.
- Giỏ hàng: Nhận định rằng tổng chi phí chưa rõ bị loại bỏ vì trang đã hiển thị thông tin giảm giá và vận chuyển theo quan sát trong bài tập.
Việc kiểm tra trực tiếp là cần thiết vì AI có thể không thao tác đầy đủ được các trạng thái hoặc luồng chức năng của website.
Kiểm tra và điều chỉnh giao diện
- Chủ động lựa chọn việc làm nổi bật CTA và bổ sung hai mức giá cho thẻ sản phẩm.
- Bổ sung phần tử span.old-price để hiển thị giá gốc.
- Nhóm giá gốc và giá sau giảm trong phần tử .product-prices.
- Dùng màu cam và chữ đậm để nhấn mạnh giá hiện tại; dùng màu xám và text-decoration: line-through cho giá gốc.
- Điều chỉnh trạng thái hover của CTA để phản hồi khi di chuột rõ hơn.
- Cần tự kiểm tra bản mã cuối cùng trên trình duyệt ở cả màn hình máy tính và điện thoại; kiểm tra liên kết CSS, đường dẫn ảnh, tình trạng tràn nội dung và hiệu ứng hover.
Không nên ghi rằng một hạng mục đã được kiểm tra thành công nếu chưa trực tiếp kiểm tra phiên bản cuối cùng của dự án.
6. Phần tôi hiểu và có thể giải thích
- index.html: Tổ chức cấu trúc trang, tiêu đề và nội dung của từng thẻ sản phẩm.
- style.css: Tách phần trình bày khỏi cấu trúc HTML, giúp dễ bảo trì và chỉnh sửa giao diện.
- .product-prices: Dùng display: flex để đặt hai mức giá cạnh nhau; gap tạo khoảng cách; align-items: baseline giúp căn theo đường cơ sở của chữ; flex-wrap: wrap cho phép xuống dòng khi thiếu không gian.
- .product-price: Định dạng giá sau giảm bằng màu cam, cỡ chữ và độ đậm để tăng mức độ nổi bật.
- .old-price: Dùng text-decoration: line-through để gạch ngang giá gốc và màu xám để giảm độ nổi bật so với giá hiện tại.
- :hover của CTA: Thay đổi cách trình bày nút khi con trỏ di chuyển lên nút, giúp người dùng nhận biết trạng thái tương tác.
- Responsive CSS: Dùng các quy tắc bố cục và media queries (nếu có trong mã cuối cùng) để điều chỉnh cách hiển thị theo chiều rộng màn hình.
Các thay đổi này giúp phân cấp thông tin và tổ chức giao diện rõ ràng hơn về mặt thiết kế. Chưa có kiểm thử người dùng hoặc dữ liệu chuyển đổi nên không kết luận rằng chúng chắc chắn làm tăng doanh số hay tỷ lệ mua hàng.