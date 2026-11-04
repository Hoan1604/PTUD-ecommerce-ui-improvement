# Rà soát sản phẩm Buổi 1

## Nguồn kế thừa

`BTVNB1_PTUD.zip` do sinh viên cung cấp, commit gốc `a43d5581a9fe3fa6ca2ddd81af50020a3a9e63ef`. Bốn SVG được giữ nguyên nội dung; HTML và CSS được tiếp tục chỉnh trong cùng repository. Bản README và AI_USAGE cũ được giữ tại `ke-thua-buoi1/` để đối chiếu.

Bài cũ đã có header, main, section, article, footer, CSS ngoài, bốn sản phẩm, Grid, Flexbox và hover/focus cho một số thành phần. Các kỹ thuật này được kế thừa; không mô tả chúng là phần hoàn toàn mới ở Buổi 2. File Word mẫu được dùng tham khảo bố cục báo cáo; thông tin sinh viên và dự án thời trang trong mẫu không được đưa vào bài Sống Xanh.

## Những vấn đề được xác nhận

| Quan sát từ mã và trình duyệt | Nguyên nhân | Thay đổi Buổi 2 | Kết quả kiểm tra |
|---|---|---|---|
| 4 ảnh trỏ `href="#"` | Đích điều hướng chỉ là đầu trang | Trỏ đúng các tệp SVG cục bộ | Bấm ảnh mở SVG và nút Back quay về được |
| 4 nút “Mua ngay” không có xử lý | HTML button chưa gắn hành vi, đã có ghi chú minh họa | Dùng `details/summary` để xem thông tin thực tế trong phạm vi HTML/CSS | Enter và Space mở/đóng; không giả lập giao dịch |
| 390 px vẫn là 2 cột, mỗi thẻ 175 px | Media query cũ chỉ đổi gap và cỡ chữ, không đổi số cột xuống 1 | 1 cột dưới 600 px | Tại 390 px, thẻ rộng 358 px; không tràn ngang |
| Chữ nhóm sản phẩm chỉ 9,92 px trên điện thoại | Quy tắc `.product-category` có font-size 0,62rem | Dùng 0,75rem, tương đương 12 px | Computed style 12 px ở cả máy tính và điện thoại |
| Giá cũ màu #858585 trên nền trắng có tỷ lệ 3,69 | Màu xám nhạt cho chữ cỡ 14,4 px | Đổi sang #58655b | Tỷ lệ 6,13; không chỉ dựa vào gạch ngang để phân biệt giá |

Đây là nhận xét về mã nguồn học tập được cung cấp, không phải đánh giá lỗi của website Cỏ Mềm. Trình tự thực hiện: chụp hiện trạng → sửa đích và ngữ nghĩa → định dạng thẻ → thực hành bố cục → kiểm tra tương tác → tự điều chỉnh → hoàn thiện tài liệu và GitHub.
