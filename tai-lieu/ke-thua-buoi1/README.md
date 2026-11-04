E-commerce UI Improvement
1. Giới thiệu
Dự án thực hiện cải tiến giao diện thẻ sản phẩm cho một trang thương mại điện tử mẫu, lấy website Cỏ Mềm làm nguồn tham khảo về trải nghiệm mua sắm trực tuyến. Mục tiêu là trình bày hình ảnh, tên sản phẩm, giá bán và nút thao tác theo thứ tự trực quan, nhất quán, dễ quan sát trên cả máy tính và điện thoại.

Đây là sản phẩm minh họa giao diện bằng HTML5 và CSS3, không phải website bán hàng hoàn chỉnh.
2. Website tham khảo
- Tên website: Cỏ Mềm
- URL: https://comem.vn/
- Khu vực đã khảo sát: Trang chủ, danh mục sản phẩm, chi tiết sản phẩm, tìm kiếm và giỏ hàng.
- Phạm vi được chọn để cải tiến: Thẻ sản phẩm trong khu vực danh sách sản phẩm.
3. Chức năng
- Hiển thị danh sách tối thiểu bốn sản phẩm mẫu.
- Hiển thị hình ảnh, tên sản phẩm và giá bán.
- Hiển thị giá sau giảm cùng giá gốc được gạch ngang để người xem dễ phân biệt hai mức giá.
- Có nút CTA “Mua ngay” trên từng thẻ sản phẩm.
- Bố cục thẻ sản phẩm nhất quán, hỗ trợ nhiều kích thước màn hình bằng CSS responsive.
- Hiển thị hình ảnh theo kích thước phù hợp, hạn chế méo ảnh và tràn nội dung.
Lưu ý: Nút mua hàng chỉ phục vụ minh họa giao diện; dự án không xử lý giỏ hàng, đơn hàng hay thanh toán thực tế.
4. Công nghệ
- HTML5: Tổ chức cấu trúc trang, danh sách sản phẩm và các thành phần nội dung.
- CSS3: Định dạng thẻ sản phẩm, màu sắc, khoảng cách, bố cục, hiệu ứng nút và khả năng thích ứng với kích thước màn hình.
5. Cách chạy
1. Tải hoặc clone repository về máy.
2. Mở thư mục dự án.
3. Mở file index.html bằng trình duyệt, chẳng hạn Google Chrome.
4. Thay đổi kích thước cửa sổ trình duyệt hoặc sử dụng chế độ thiết bị trong Developer Tools để kiểm tra giao diện ở các kích thước màn hình khác nhau.
Nếu dự án sử dụng ảnh từ URL bên ngoài, máy tính cần có kết nối Internet để tải ảnh. Nếu ảnh được lưu trong thư mục dự án, hãy bảo đảm đường dẫn ảnh trong HTML là chính xác.
6. Cải tiến đã thực hiện
Vấn đề ban đầu
Trong quá trình xây dựng giao diện thẻ sản phẩm, phần giá ban đầu chỉ thể hiện một mức giá nên chưa giúp người xem so sánh trực quan giữa giá hiện tại và giá gốc. Nút CTA cũng cần được nhấn mạnh hơn để dễ nhận biết.

Đây là vấn đề được xác định trong phạm vi giao diện bài tập, không phải kết luận rằng website Cỏ Mềm đang mắc lỗi tương tự.
Thay đổi đã thực hiện
- Làm nổi bật nút CTA “Mua ngay”: Điều chỉnh màu sắc và hiệu ứng khi di chuột để trạng thái tương tác dễ nhận biết hơn.
- Bổ sung hai mức giá: Hiển thị giá bán sau giảm bằng màu cam và chữ đậm; hiển thị giá gốc bằng màu xám và gạch ngang.
- Nhóm phần giá: Sử dụng phần tử có class product-prices để sắp xếp các mức giá trên cùng một hàng khi đủ không gian và cho phép xuống dòng khi cần.
- Duy trì bố cục nhất quán: Sắp xếp hình ảnh, tên, giá và nút thao tác theo cấu trúc thống nhất giữa các thẻ sản phẩm.
- Hướng đến responsive: Kiểm tra khả năng hiển thị trên màn hình máy tính và điện thoại, chú ý tình trạng tràn hoặc che khuất nội dung.
Các thành phần HTML/CSS đáng chú ý
- index.html: Chứa cấu trúc trang và nội dung sản phẩm.
- style.css: Chứa quy tắc trình bày giao diện.
- .product-prices: Dùng display: flex, flex-wrap, align-items và gap để sắp xếp các mức giá.
- .product-price: Làm nổi bật giá hiện tại bằng màu cam, cỡ chữ và độ đậm.
- .old-price: Dùng text-decoration: line-through và màu xám để phân biệt giá gốc.
- Trạng thái :hover của nút CTA: Thể hiện phản hồi trực quan khi người dùng di chuột lên nút.
7. Hỗ trợ từ AI
ChatGPT được sử dụng để hỗ trợ:
- Đề xuất khung phân tích UX cho năm khu vực của website Cỏ Mềm.
- Đề xuất phương án thiết kế lại thẻ sản phẩm và giải thích lựa chọn bố cục.
- Tạo bản nháp mã HTML/CSS, hướng dẫn liên kết hai file và giải thích các quy tắc quan trọng.
- Hướng dẫn điều chỉnh nút CTA và bổ sung phần giá gốc/giá sau giảm.
Người thực hiện đã khảo sát website tham khảo, kiểm tra lại các nhận định do AI đề xuất và không sử dụng một số nhận định chưa phù hợp với quan sát thực tế. Ví dụ, việc kiểm tra cho thấy một số thông tin AI nêu về bộ lọc, nút mua, tìm kiếm và tổng chi phí giỏ hàng không chính xác hoặc chưa đầy đủ; các nhận định đó được loại bỏ hoặc điều chỉnh theo kết quả kiểm tra.

Phần cải tiến giá được lựa chọn và mô tả trong bài tập: bổ sung old-price, nhóm hai mức giá bằng product-prices, làm nổi bật giá hiện tại và điều chỉnh hiệu ứng CTA. Trước khi nộp bài, cần tự kiểm tra mã nguồn cuối cùng, đường dẫn ảnh, bố cục responsive và hiệu ứng nút trên trình duyệt.

Giới hạn: Dự án chưa có dữ liệu kiểm thử người dùng, vì vậy chưa thể kết luận những thay đổi này làm tăng tỷ lệ mua hàng hoặc cải thiện hành vi mua sắm thực tế.