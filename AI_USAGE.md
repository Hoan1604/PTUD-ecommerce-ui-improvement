# Nhật ký sử dụng AI theo tiến trình thực hành Buổi 2

Sinh viên: **Vũ Văn Hoàn – 31241028406**. Công cụ hỗ trợ: **Codex**. Ngày tổng hợp: **04/11/2026**.

Nhật ký được biên soạn theo chín prompt trong đề, thể hiện yêu cầu đã cụ thể hóa trên mã Sống Xanh, phản hồi được tổng hợp và kết quả đối chiếu. Cách trình bày hội thoại là bản biên tập nội dung thực hành, không phải bản chép nguyên văn từng tin nhắn. Các kết quả phải đọc cùng mã và minh chứng tương ứng.

## Lượt 1 – Phân tích mã nguồn hiện tại

**Bước 1 · Sinh viên – Prompt theo đề được cụ thể hóa**

Tôi đang làm bài tập cá nhân Buổi 2 môn Phát triển ứng dụng TMĐT. Tôi tiếp tục giao diện Sống Xanh từ Buổi 1, tham khảo Cỏ Mềm. index.html đã có bốn article với ảnh, tên, hai mức giá và nút Mua ngay; css/style.css đã có Grid và Flexbox. Hãy xác định phần đã có, nêu ít nhất ba vấn đề có căn cứ, đề xuất hướng cải thiện và giải thích thứ tự thực hiện. Chưa viết lại toàn bộ website và giữ nút Mua ngay của bài cũ.

**AI – Phản hồi tổng hợp**

Mã cũ đã có header, main, section, article, footer, CSS ngoài, Grid và Flexbox nên cần kế thừa. Các điểm cần cải thiện: liên kết ảnh dùng href="#"; ở 390 px vẫn hai cột làm thẻ chỉ rộng 175 px; chữ nhóm sản phẩm còn 9,92 px; giá cũ màu #858585 trên trắng có tương phản 3,69. Nút Mua ngay là CTA minh họa trong phạm vi buổi học, được giữ lại với ghi chú chưa xử lý giao dịch. Thứ tự phù hợp là chụp hiện trạng, sửa cấu trúc/đích liên kết, định dạng thẻ, thử bố cục rồi kiểm tra.

**Kiểm tra và quyết định thực hiện**

Giữ bốn SVG, tên và giá của Buổi 1. Đối chiếu mã gốc tại a43d558 và ảnh trong minh-chung/truoc; bảng rà soát ở tai-lieu/RA_SOAT_BUOI_1.md.

## Lượt 2 – Kiểm tra cấu trúc HTML5

**Bước 2 · Sinh viên – Prompt theo đề được cụ thể hóa**

Tôi đang học HTML5 và muốn củng cố cấu trúc khu vực sản phẩm Sống Xanh. Hãy kiểm tra header, nav, main, section, article, footer; thứ bậc h1/h2; img, alt và a. Tôi cần dùng ul/li khi nội dung là danh sách, không thêm thẻ chỉ để làm mã dài hơn. Với liên kết Xem chi tiết, hãy dùng một trang HTML thật có ảnh và thông tin sản phẩm, giữ riêng nút Mua ngay.

**AI – Phản hồi tổng hợp**

Main giữ nội dung chính duy nhất. Section sản phẩm có h1, mỗi article có h2 và aria-labelledby trỏ đúng tiêu đề. Menu và tập hợp bốn sản phẩm dùng ul/li; thông tin quy cách trên trang chi tiết dùng dl/dt/dd. Mỗi ảnh có alt mô tả phù hợp. Dùng a cho điều hướng tới san-pham/tinh-chat.html và các trang tương ứng; button type="button" cho CTA Mua ngay minh họa. Không đặt disclosure trong thẻ danh sách vì việc mở một thẻ có thể tăng chiều cao cả hàng.

**Kiểm tra và quyết định thực hiện**

Đã kiểm tra một h1 trên mỗi trang, ID không trùng, bốn article ở danh sách, CSS liên kết đúng và các đường dẫn cục bộ tồn tại.

## Lượt 3 – Tạo và liên kết CSS cơ bản

**Bước 3 · Sinh viên – Prompt theo đề được cụ thể hóa**

Cấu trúc dự án gồm index.html, css/style.css, images/ và bốn trang trong san-pham/. Hãy hướng dẫn liên kết stylesheet từ trang gốc và trang con, định dạng font, màu chữ, nền, margin của body và ảnh không vượt khung. Không dùng Bootstrap hoặc Tailwind. Chỉ ra cách kiểm tra CSS đã được áp dụng trong trình duyệt.

**AI – Phản hồi tổng hợp**

Từ index.html dùng href="css/style.css"; từ san-pham/*.html dùng href="../css/style.css". Body đặt margin:0, font-family Arial/Helvetica/sans-serif, line-height:1.6 và màu từ biến CSS. Img có display:block, max-width:100%, height:auto. Trong DevTools, xem tab Network để kiểm tra stylesheet tải được và tab Computed để xem padding/màu/kiểu hiển thị thực tế. Dùng đường dẫn tương đối để trang chạy cả khi mở file trực tiếp.

**Kiểm tra và quyết định thực hiện**

Mở trang danh sách và cả bốn trang chi tiết bằng HTTP lẫn file://; ảnh và CSS tải được. Không có stylesheet hoặc thư viện chạy ngoài cho giao diện.

## Lượt 4 – Thực hành selector và Box Model

**Bước 4 · Sinh viên – Prompt theo đề được cụ thể hóa**

Tôi muốn định dạng thẻ sản phẩm hiện có. Hãy minh họa element selector, class selector và descendant selector; giải thích margin, padding, border, border-radius và box-sizing:border-box. Tên và hai mức giá cần rõ ràng; liên kết Xem chi tiết được trình bày thành nút phụ. Chỉ sửa CSS cần thiết và không thay toàn bộ HTML.

**AI – Phản hồi tổng hợp**

Dùng img làm element selector, .product-card hoặc .product-info làm class selector, .product-card .btn-detail làm descendant selector. Product-info có padding 20 px trên máy tính, 16 px dưới 600 px. Product-description có margin 8px 0 16px; article có border 1 px và bo góc 14 px. Padding nằm trong phần tử, margin nằm ngoài; border-box đưa padding và border của chính phần tử vào width. Giá cũ đổi sang #58655b để tăng tương phản, trong khi giá hiện tại dùng #a83e32.

**Kiểm tra và quyết định thực hiện**

Computed style khớp với CSS. Ở 1366 px, thẻ rộng 263,5 px; vùng bên trong border 261,5 px; sau padding ngang 20 px mỗi bên, vùng chữ còn 221,5 px. Có ảnh thẻ trước/sau.

## Lượt 5 – Thực hành Flexbox

**Bước 5 · Sinh viên – Prompt theo đề được cụ thể hóa**

Tôi chọn nhóm hai mức giá và nhóm nút trên mỗi thẻ để thực hành Flexbox. Hãy xác định phần tử cha, giải thích justify-content, align-items và gap; thử flex-start so với space-between, baseline so với flex-start. Nhóm Mua ngay và Xem chi tiết cần xếp gọn theo cột. Không sử dụng framework và không viết lại giao diện.

**AI – Phản hồi tổng hợp**

Đặt display:flex trên .product-prices; giữ flex-direction:row mặc định, justify-content:flex-start, align-items:baseline, flex-wrap:wrap và gap:4px 10px. Giá hiện tại 20 px và giá cũ 14 px có đường cơ sở thẳng nhau. Với .product-actions, dùng flex-direction:column, align-items:stretch và gap:10px để hai nút cùng rộng. Khi chuyển sang cột, trục chính chuyển từ ngang sang dọc.

**Kiểm tra và quyết định thực hiện**

Thực nghiệm ở 1366 px: khoảng cách hai giá là 10 px với flex-start và 63,05 px với space-between; baseline tạo chênh mép trên 6 px, flex-start tạo 0 px. Bản nộp giữ flex-start/baseline. Ảnh trong minh-chung/thu-nghiem.

## Lượt 6 – Thực hành CSS Grid

**Bước 6 mở rộng · Sinh viên – Prompt theo đề được cụ thể hóa**

Tôi có ul.product-grid chứa bốn li/article từ Buổi 1. Hãy giúp bố trí thử hai và ba cột, giải thích display:grid, grid-template-columns, repeat, minmax và gap. Tôi muốn giữ ảnh đúng tỷ lệ và bố cục cuối phù hợp máy tính, máy tính bảng, điện thoại. Giải thích vì sao có thể chọn contain thay cho cover với SVG bao bì sản phẩm.

**AI – Phản hồi tổng hợp**

Grid định nghĩa hệ cột cho danh sách; repeat(n,minmax(0,1fr)) tạo n cột chia đều và cho phép co lại. Đã thử hai và ba cột ở cùng 1366 px; bản cuối dùng bốn cột từ 1024 px, hai cột 600–1023 px và một cột dưới 600 px. Khung ảnh vuông bằng aspect-ratio:1/1. Object-fit:contain giữ toàn bộ hình bao bì; cover phủ kín khung nhưng có thể cắt mép. Trang chi tiết dùng lưới hai cột, chuyển một cột dưới 768 px.

**Kiểm tra và quyết định thực hiện**

Danh sách được đo ở chín chiều rộng 320–1366 px. Bốn trang chi tiết được đo tại 1366/768/390/320 px, tổng cộng 16 trường hợp. Không ghi nhận tràn ngang trong các trường hợp đã thử.

## Lượt 7 – Bổ sung hover và focus

**Bước 7 · Sinh viên – Prompt theo đề được cụ thể hóa**

Tôi muốn giữ nút Mua ngay làm CTA chính và Xem chi tiết làm liên kết phụ. Hãy thêm hover nhẹ, transition 0,2 giây và focus-visible rõ khi dùng Tab. Giải thích hover khác focus, kiểm tra bằng bàn phím, và tôn trọng lựa chọn giảm chuyển động.

**AI – Phản hồi tổng hợp**

Mua ngay có nền #315c43, chữ trắng; hover đổi nền thành #244832. Xem chi tiết có viền xanh, nền trắng; hover dùng nền xanh rất nhạt. Hai thành phần dùng transition cho màu và viền trong 0,2 giây; focus-visible có outline 3 px, offset 4 px. Hover theo vị trí con trỏ; focus là phần tử nhận tương tác. Tab đi tới button và liên kết; Enter trên Xem chi tiết mở trang đích. Prefers-reduced-motion:reduce tắt chuyển động.

**Kiểm tra và quyết định thực hiện**

Đã chụp trạng thái bình thường/hover/focus. Outline đo được 3 px; transition 0,2 giây và trở về 0 khi bật giảm chuyển động. CTA không tạo đơn hàng vì chưa có JavaScript/backend.

## Lượt 8 – Kiểm tra lỗi và điều chỉnh mã

**Bước 8 · Sinh viên – Prompt theo đề được cụ thể hóa**

Khi tôi nhấn Xem thông tin ở một sản phẩm, phần nội dung sổ xuống kéo theo khoảng trắng ở các thẻ bên cạnh. Tôi muốn giữ nút Mua ngay và chuyển phần chi tiết sang trang HTML có ảnh cùng nội dung sản phẩm, trong phạm vi HTML/CSS của bài. Hãy phân biệt nguyên nhân đã xác định, cách sửa ít tác động, và cách kiểm tra sau sửa. Ngoài ra, hướng dẫn tôi tự tăng padding trên điện thoại từ 14 px lên 16 px.

**AI – Phản hồi tổng hợp**

Nguyên nhân đã xác định là Grid tăng chiều cao hàng theo thẻ đang mở; align-items:stretch và margin-top:auto của nhóm giá khiến các thẻ còn lại xuất hiện khoảng trắng. Không cần bỏ Grid. Giữ hai CTA và chuyển Xem chi tiết thành liên kết tới bốn trang tĩnh; trang danh sách không còn details/summary. Kiểm tra chiều cao và vị trí giá trước khi đi chi tiết, rồi quay lại để bảo đảm không đổi. Phần padding cần sửa đúng trong @media(max-width:599px), lưu và tải lại, vì quy tắc media query có thể ghi đè quy tắc cơ sở.

**Kiểm tra và quyết định thực hiện**

Bản cũ có khoảng trống mô tả–giá 226,78 px ở ba thẻ bên cạnh khi mở một thẻ; bản cuối là 16 px ở bốn thẻ. Sinh viên đã xác nhận tự sửa padding 14→16 px; mã hiện tại giữ 16 px dưới 600 px và 20 px từ 600 px. Lượt kiểm tra cuối: 97 đạt, 0 thất bại. Ảnh và phép đo do AI thực hiện, thao tác sửa padding do sinh viên xác nhận.

## Lượt 9 – Hoàn thiện README và GitHub

**Hoàn thiện nộp bài · Sinh viên – Prompt theo đề được cụ thể hóa**

Tôi đang hoàn thiện README cho bài cá nhân Buổi 2 tiếp tục Sống Xanh từ Buổi 1. Hãy đề xuất cấu trúc gồm giới thiệu, website tham khảo, khu vực cải tiến, kỹ thuật HTML5/CSS3, cách chạy, thay đổi đã thực hiện, công cụ AI và cách kiểm tra. Ghi đúng repository cũ, phân biệt chức năng xem chi tiết đã hoạt động với nút mua chỉ minh họa. Không tự bịa thông tin triển khai.

**AI – Phản hồi tổng hợp**

README cần nêu đúng tác giả/MSSV, phạm vi danh sách và bốn trang chi tiết tĩnh; cách mở index.html không cần cài thư viện; liên kết tới ảnh, kiểm thử, câu hỏi kiến thức và nhật ký AI. Nêu rõ Mua ngay chưa kết nối giỏ hàng/đặt hàng. Dùng repository Hoan1604/PTUD-ecommerce-ui-improvement, nhánh main; kiểm tra diff, commit, push rồi đối chiếu remote. Không khẳng định GitHub Pages đã triển khai nếu chưa xác nhận.

**Kiểm tra và quyết định thực hiện**

README, AI_USAGE và tài liệu được đồng bộ với mã cuối; ảnh sổ xuống cũ chỉ dùng để phân tích lỗi, ảnh trong sau/ là giao diện hiện tại. Gói nộp gồm mã nguồn, minh chứng, báo cáo Word và bảng đối chiếu yêu cầu.

## Phần tự điều chỉnh và đánh giá đề xuất AI

- Sinh viên đã tự đổi padding trên điện thoại từ 14px thành 16px và xác nhận hoàn thành. AI đối chiếu file đã lưu và kiểm tra lại; ảnh gốc của bước này được giữ ở `minh-chung/tu-thuc-hanh/`. Đây là minh chứng đã ghi nhận trước đợt chuyển chi tiết sang trang riêng.
- Sinh viên phản hồi rằng việc thay nút Mua ngay bằng phần sổ xuống chưa phù hợp, đồng thời chỉ ra khoảng trắng xuất hiện ở thẻ bên cạnh. Đề xuất đó được điều chỉnh: khôi phục Mua ngay, tách điều hướng Xem chi tiết và dùng trang HTML tĩnh.
- AI thực hiện các phép đo trình duyệt, chụp ảnh và tổng hợp tài liệu. Không ghi các phép kiểm tra tự động là thao tác sinh viên tự chạy; không suy ra kết quả doanh số hoặc kiểm thử trên điện thoại thật.
