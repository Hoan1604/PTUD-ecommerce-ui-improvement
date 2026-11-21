# ASP.NET Core – quản lý và đặt mua phim

Ứng dụng ASP.NET Core MVC quản lý phim và thể loại, hỗ trợ giỏ hàng, đặt hàng, thông tin giao hàng và email xác nhận. Dự án sử dụng .NET 10, Entity Framework Core, SQL Server, ASP.NET Core Identity, Razor Views, session và Bootstrap. Các migration và ảnh trong `wwwroot/images` được giữ trong mã nguồn; cơ sở dữ liệu và dữ liệu đơn hàng không được đưa vào repository.

Chức năng gồm xem, thêm, sửa, xóa phim và thể loại; thêm phim vào giỏ hàng, thanh toán, lưu hóa đơn và gửi email xác nhận. Chức năng email đã thử thành công trên máy cá nhân nhưng chưa cấu hình gửi thành công trên Somee.

## Cấu trúc thư mục

- `SourceCode/`: dự án ứng dụng.
  - `Controllers/`, `Models/`, `Views/`: xử lý yêu cầu, mô hình dữ liệu và giao diện MVC.
  - `Data/`: `ApplicationDbContext` cho Entity Framework Core và Identity; `Migrations/`: các migration tạo và cập nhật lược đồ cơ sở dữ liệu.
  - `Extension/`: tiện ích session và gửi email; `Validation/`: các thuộc tính kiểm tra dữ liệu.
  - `Areas/Identity/`: phần giao diện Identity được tùy chỉnh trong dự án; `Properties/`: cấu hình chạy cục bộ (`launchSettings.json`).
  - `wwwroot/`: CSS, JavaScript, thư viện giao diện và hình ảnh phim.
  - `Program.cs`: cấu hình dịch vụ, kết nối SQL Server và định tuyến; `31241028406_VuVanHoan.csproj`: framework, gói phụ thuộc và ID User Secrets.
  - `appsettings.example.json`: cấu hình mẫu với giá trị giả; `.gitignore`: loại cấu hình cục bộ, cơ sở dữ liệu và kết quả build khỏi Git.
  - `bin/`, `obj/`: kết quả build và file tạm được tạo cục bộ, không thuộc bản nộp.
- `Report/`: hiện chưa có file.
- `README.md`: tài liệu dự án và hướng dẫn chạy.

## Chuẩn bị và cấu hình

1. Cài .NET SDK 10 và kiểm tra bằng `dotnet --list-sdks`. Cài hoặc truy cập một SQL Server, bảo đảm máy chạy ứng dụng kết nối được và tài khoản có quyền tạo hoặc cập nhật cơ sở dữ liệu dành cho bài này.
2. Từ thư mục gốc repository, mở terminal tại dự án:

   ```powershell
   cd ASP-CORE/SourceCode
   dotnet restore
   ```

3. Cấu hình khóa bắt buộc `ConnectionStrings:DefaultConnection` bằng chuỗi kết nối SQL Server của bạn. Chuỗi cần xác định máy chủ, tên cơ sở dữ liệu và phương thức xác thực phù hợp. `appsettings.example.json` minh họa các trường bằng giá trị giả; ứng dụng không tự nạp file mẫu. Không đưa cấu hình thật vào repository.

### User Secrets cho máy phát triển

Dự án đã có `UserSecretsId` trong file `.csproj`. Trên Windows, tạo thư mục và file sau nếu chưa tồn tại, hoặc mở User Secrets bằng IDE:

`%APPDATA%\Microsoft\UserSecrets\ptud-ecommerce-submission-4f25c372-4266-4b06-a661-76d0f3cfd854\secrets.json`

Nội dung có cấu trúc như sau; thay các giá trị trong ngoặc nhọn bằng thông tin riêng trên máy của bạn:

```json
{
  "ConnectionStrings:DefaultConnection": "<chuỗi kết nối SQL Server của bạn>",
  "Email:Address": "<địa chỉ Gmail gửi thư>",
  "Email:AppPassword": "<Gmail App Password>"
}
```

Hai khóa email là tùy chọn. Khi thiếu cấu hình email, đơn hàng vẫn được lưu nhưng thư xác nhận không được gửi. Email dùng Gmail SMTP; cần tài khoản và App Password phù hợp nếu muốn thử gửi. Không chia sẻ file secrets hoặc lịch sử terminal chứa giá trị thật. `dotnet user-secrets list` hiển thị cả giá trị bí mật.

User Secrets được nạp trong môi trường `Development`. Trước khi chạy migration và ứng dụng trong PowerShell, chọn môi trường này:

```powershell
$env:ASPNETCORE_ENVIRONMENT = "Development"
```

### Biến môi trường

Có thể dùng `ConnectionStrings__DefaultConnection`, `Email__Address` và `Email__AppPassword` thay cho User Secrets; hai dấu gạch dưới tương ứng với dấu `:` trong tên khóa. Cấu hình các biến bằng công cụ quản lý môi trường của máy hoặc máy chủ, tránh ghi giá trị thật vào file theo dõi. Với Somee, cấu hình riêng trên máy chủ; việc gửi email trên Somee hiện chưa thành công.

## Khôi phục và chạy

Các lệnh dưới đây chạy trong `ASP-CORE/SourceCode` sau khi đã cấu hình kết nối và môi trường ở trên:

```powershell
dotnet tool install --global dotnet-ef --version 10.0.15
dotnet ef database update
dotnet run
```

Nếu `dotnet-ef` đã được cài, dùng phiên bản tương thích với EF Core 10 thay vì cài lại; bảo đảm thư mục công cụ .NET toàn cục có trong PATH. `dotnet ef database update` áp dụng các migration vào cơ sở dữ liệu trong chuỗi kết nối và có thể tạo cơ sở dữ liệu nếu tài khoản có quyền. Kiểm tra đích kết nối trước khi chạy để tránh thay đổi nhầm cơ sở dữ liệu. Mở địa chỉ localhost được `dotnet run` hiển thị. Dữ liệu mẫu không được bao gồm; thêm phim và thể loại để thử các chức năng.

## Kiểm tra trước khi nộp

Từ thư mục gốc repository, chạy `git status --short --untracked-files=all` và `git ls-files --others --exclude-standard ASP-CORE` để xem các file chưa được theo dõi; dùng `git diff --cached --name-only` sau khi stage để kiểm tra chính xác danh sách đã stage. Rà soát bí mật trước khi commit; không dùng `git add -f` với cấu hình cục bộ hoặc thư mục build.
