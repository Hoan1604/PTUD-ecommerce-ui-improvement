# Báo cáo sử dụng AI Buổi 2

## Công cụ và phân công

Codex hỗ trợ phân tích file đề PDF, đọc mã Buổi 1, sửa HTML/CSS, chạy thử bằng Playwright trên Chrome/Edge, chụp ảnh và biên soạn báo cáo Word. Nhật ký này phân biệt yêu cầu thực tế, tóm tắt kỹ thuật và thao tác cá nhân.

## Prompt thực tế của sinh viên

Trích nguyên văn yêu cầu ban đầu trong cuộc trao đổi:

> Tôi đang cần làm và nộp bài tập về nhà buổi 2 môn phát triển ứng dụng, tôi đã gửi cho bạn đề bài tập về nhà, cùng với những gì tôi đã làm ở bài tập về nhà buổi 1. Bạn hãy giúp tôi làm hoàn thiện đầy đủ và chi tiết bài tập buổi 2 này đúng yêu cầu trong từng bài tập, cải tiến và thực hành đúng phù hơp thực tế. Kết quả bạn đưa tôi là toàn bộ những gì tôi sẽ nộp, do đó hãy gửi tôi bản final phù hợp đầy đủ, chi tiết và hợp lý để nộp. Ngoài các file được tổng hợp vào folder để nộp và up lên github thì sẽ có 1 file word để báo cáo trình bày lại đầy đủ và hợp lý những gì đã làm để báo cáo, bạn có thể tham khảo cách trình bày trong file word trên tôi gửi bạn (bạn có thể cải tiến thêm cho phù hợp, đừng quá bị quá bias vào mẫu, cái nào phù hợp thì làm không thì cứ cải tiến).

Thông tin bổ sung thực tế: “31241028406”. Khi được hướng dẫn bước tự sửa, sinh viên trả lời: “Tôi cần hướng dẫn thao tác cụ thể”. AI sau đó cung cấp từng bước tìm quy tắc CSS, lưu, tải lại, dùng DevTools và chụp màn hình.

## Chín nhóm hỗ trợ và cách đối chiếu

Các dòng sau là **tóm tắt công việc đã thực hiện**, sắp xếp theo chín nhóm nội dung của đề. Đây không phải chín prompt riêng đã gửi và không phải bản chép nguyên văn cuộc hội thoại.

| Nhóm | Nội dung hỗ trợ | Kết quả và căn cứ kiểm tra |
|---|---|---|
| 1 Rà soát mã cũ | Xác định phần đã có và ít nhất ba điểm cần cải thiện | Giữ Grid/Flexbox/ảnh; xác nhận href #, button chưa xử lý, thẻ 175px ở 390px, chữ nhóm 9,92px |
| 2 HTML5 | Tổ chức điều hướng, danh sách và đơn vị sản phẩm | nav/ul/li; article đặt tên bằng h2; details/summary và dl; kiểm tra ID và fragment |
| 3 CSS ngoài | Duy trì cấu trúc css/style.css và nguồn cục bộ | 1 stylesheet, không CSS inline, ảnh tải được qua HTTP và file |
| 4 Selector và Box Model | Chọn phần tử, margin, padding, border và bo góc | img, product-card, descendant image-link; computed style khớp |
| 5 Flexbox | Thử flex-start/space-between và baseline/flex-start | Khoảng cách đo được 10/63,05px; ảnh trong thu-nghiem |
| 6 Grid | Thử 2/3 cột rồi chọn 4/2/1 theo viewport | 9 viewport; ảnh thử; phép thử bỏ Grid cho thẻ rộng 1120px |
| 7 Hover/focus | Tạo phản hồi chuột và bàn phím | Hover đổi nền, transition .2s; viền focus 3px; Enter/Space mở/đóng |
| 8 Kiểm tra và tự sửa | Chạy phép thử, hướng dẫn sinh viên đổi padding 14→16px | JSON kiểm thử; phần thực hành cá nhân có trạng thái riêng |
| 9 README và GitHub | Đồng bộ mô tả, ảnh, câu hỏi kiến thức và cách nộp | README, tài liệu, lịch sử commit và GITHUB.md |

## Đề xuất đã được điều chỉnh khi kiểm tra

- Không thay dự án Sống Xanh bằng dự án thời trang trong Word mẫu; thông tin tên/MSSV lấy đúng từ sinh viên và lịch sử repo khớp MSSV.
- Không dùng `object-fit: cover` một cách máy móc từ ví dụ đề: giữ contain để toàn bộ hình bao bì SVG được hiển thị. Cover có thể cắt mép ảnh.
- Không dùng liên kết product-detail.html chưa tồn tại hoặc nút mua không xử lý. Dùng liên kết SVG thật và disclosure HTML gốc phù hợp phạm vi buổi học.
- Không mô tả Grid/Flexbox là hoàn toàn mới, vì mã Buổi 1 đã có.
- Không coi phép kiểm tra tự động là thao tác do sinh viên tự thực hiện, hoặc khẳng định đã thử trên điện thoại vật lý.

## Phần sinh viên tự điều chỉnh

Sinh viên xác nhận “Tôi vừa sửa xong thành 16px”. AI đối chiếu file đã lưu, kiểm tra lại bản mã đồng bộ và chụp ảnh trước/sau từ hai trạng thái mã. Thao tác sửa CSS do sinh viên thực hiện; số đo và ảnh trong bộ bài do AI thực hiện. Xem `tai-lieu/THUC_HANH_CA_NHAN.md`.

## Kiểm chứng và giới hạn

58 phép kiểm tra đạt trên bộ môi trường đã ghi. Ảnh và số đo đi kèm để đối chiếu kết quả, không chứng minh tác động đến doanh số hoặc mức độ hài lòng của khách hàng. Bản ghi Buổi 1 trong `tai-lieu/ke-thua-buoi1/` chỉ phản ánh tài liệu gốc, không được dùng để nhận đã làm lại các khảo sát UX trong Buổi 2.
