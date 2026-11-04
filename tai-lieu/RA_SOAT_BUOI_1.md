# Rà soát và quyết định thiết kế

## Nguồn kế thừa

Mã từ BTVNB1_PTUD.zip, commit a43d5581a9fe3fa6ca2ddd81af50020a3a9e63ef. Giữ bốn SVG, tên và hai mức giá; tài liệu cũ nằm trong ke-thua-buoi1. Bài cũ đã có HTML ngữ nghĩa, CSS ngoài, Grid, Flexbox và hover/focus một số thành phần.

| Vấn đề có căn cứ | Nguyên nhân | Điều chỉnh | Kết quả |
|---|---|---|---|
| Ảnh dùng href # | Đích điều hướng chưa có nội dung | Mở trang HTML chi tiết thật, từ đó mở được SVG gốc | Bốn trang và các liên kết quay lại được kiểm tra |
| 390px vẫn hai cột, mỗi thẻ 175px | Media query chưa chuyển còn một cột | Grid một cột dưới 600px | Thẻ 358px tại 390px, không tràn ngang |
| Chữ nhóm 9,92px trên điện thoại | Font-size 0,62rem | Dùng 0,75rem | Computed style 12px |
| Giá cũ xám nhạt, tương phản 3,69 | Màu #858585 trên trắng | Đổi sang #58655b | Tương phản 6,13 |

## Điều chỉnh sau khi xem giao diện

Phương án sổ xuống của bản kiểm tra làm một hàng Grid cao lên theo thẻ đang mở. Các thẻ khác bị stretch và nhóm giá có margin-top:auto nên khoảng trắng mô tả–giá tăng lên 226,78px. Bản hoàn thiện bỏ disclosure trong danh sách, khôi phục Mua ngay và bổ sung Xem chi tiết dẫn tới bốn trang HTML tĩnh. Khoảng cách tương ứng còn 16px, không thay đổi khi xem chi tiết rồi quay lại.

Mua ngay được giữ là nút minh họa như phạm vi Buổi 1/2, có ghi chú chưa kết nối đặt hàng. Đây là giới hạn chức năng được công bố, không khẳng định đã có giao dịch. Không bỏ Grid chỉ để tránh hiện tượng giãn hàng; nguyên nhân được giải quyết bằng cách tách nội dung dài khỏi thẻ.
