# ASP.NET Core – quản lý và đặt mua phim

Ứng dụng ASP.NET Core MVC quản lý phim và thể loại, hỗ trợ giỏ hàng, đặt hàng, thông tin giao hàng và email xác nhận. Dự án sử dụng .NET 10, Entity Framework Core, SQL Server, ASP.NET Core Identity, Razor Views, session và Bootstrap. Các migration và ảnh trong `wwwroot/images` được giữ trong mã nguồn; cơ sở dữ liệu và dữ liệu đơn hàng không được đưa vào repository.

Chức năng gồm xem, thêm, sửa, xóa phim và thể loại; thêm phim vào giỏ hàng, thanh toán, lưu hóa đơn và gửi email xác nhận. Chức năng email đã thử thành công trên máy cá nhân nhưng chưa cấu hình gửi thành công trên Somee.

## Chuẩn bị và cấu hình

Cần .NET SDK 10, một SQL Server có thể kết nối và quyền tạo/cập nhật cơ sở dữ liệu. Mở terminal tại `ASP-CORE/SourceCode`. `appsettings.example.json` chỉ chứa giá trị giả để tham khảo; ứng dụng tự đọc User Secrets trong môi trường Development hoặc biến môi trường, không tự nạp file mẫu.

Thiết lập User Secrets cho dự án bằng cách chạy `dotnet user-secrets init` (dự án đã có ID riêng), rồi mở file `%APPDATA%\Microsoft\UserSecrets\ptud-ecommerce-submission-4f25c372-4266-4b06-a661-76d0f3cfd854\secrets.json` trên Windows (hoặc dùng công cụ quản lý User Secrets của IDE) và đặt các khóa sau:

```json
{
  "ConnectionStrings:DefaultConnection": "<chuỗi kết nối SQL Server của bạn>",
  "Email:Address": "<địa chỉ Gmail gửi thư>",
  "Email:AppPassword": "<Gmail App Password>"
}
```

Có thể chạy `dotnet user-secrets list` để xác nhận tên khóa, nhưng lệnh này hiển thị cả giá trị nên không dùng ở nơi công khai. Không đưa secrets vào file cấu hình được theo dõi hoặc chia sẻ lịch sử terminal. Email là tùy chọn; nếu thiếu cấu hình, đơn hàng vẫn được lưu nhưng email không gửi được.

Ngoài ra có thể cấu hình biến môi trường `ConnectionStrings__DefaultConnection`, `Email__Address` và `Email__AppPassword`. Trên môi trường triển khai như Somee, đặt các giá trị trong cấu hình riêng của máy chủ. Hai dấu gạch dưới biểu diễn dấu `:` trong khóa cấu hình. File `appsettings.json` và `appsettings.Development.json` trong SourceCode được Git bỏ qua nếu cần cấu hình riêng tại máy.

## Khôi phục và chạy

```powershell
cd ASP-CORE/SourceCode
dotnet restore
dotnet tool install --global dotnet-ef --version 10.0.15
dotnet ef database update
dotnet run
```

Nếu `dotnet-ef` đã được cài, dùng phiên bản tương thích với EF Core 10 thay vì cài lại. Tạo hoặc cập nhật cơ sở dữ liệu chỉ sau khi kiểm tra chuỗi kết nối trỏ đến cơ sở dữ liệu dành cho bài này. Mở địa chỉ localhost được `dotnet run` hiển thị. Dữ liệu mẫu không được bao gồm; thêm phim và thể loại để thử các chức năng.

## Kiểm tra trước khi nộp

Từ thư mục gốc repository, chạy `git status --short --untracked-files=all` và `git ls-files --others --exclude-standard ASP-CORE` để xem các file chưa được theo dõi; dùng `git diff --cached --name-only` sau khi stage để kiểm tra chính xác danh sách đã stage. Rà soát bí mật trước khi commit; không dùng `git add -f` với cấu hình cục bộ hoặc thư mục build.

