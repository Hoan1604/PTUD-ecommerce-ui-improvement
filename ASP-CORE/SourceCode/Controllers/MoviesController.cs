using _31241028406_VuVanHoan.Extension;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using _31241028406_VuVanHoan.Data;
using _31241028406_VuVanHoan.Models;

namespace _31241028406_VuVanHoan.Controllers
{
    public class MoviesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;

        public MoviesController(
    ApplicationDbContext context,
    IWebHostEnvironment env,
    IConfiguration configuration)
        {
            _context = context;
            _env = env;
            _configuration = configuration;
        }
        // Lưu ảnh vào wwwroot/images và trả về đường dẫn của ảnh
        private async Task<string> SaveImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return null;
            }

            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (!new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" }.Contains(ext))
            {
                return null;
            }

            var folder = Path.Combine(_env.WebRootPath, "images");
            Directory.CreateDirectory(folder);

            var fileName = Guid.NewGuid().ToString("N") + ext;
            var filePath = Path.Combine(folder, fileName);

            using var stream = System.IO.File.Create(filePath);
            await file.CopyToAsync(stream);

            return "/images/" + fileName;
        }
        public IActionResult AddToCart(int id)
        {
            // Tìm phim theo ID
            var movie = _context.Movies.FirstOrDefault(x => x.ID == id);

            if (movie == null)
            {
                return RedirectToAction(nameof(Index));
            }

            // Lấy giỏ hàng từ Session
            var hoaDon = HttpContext.Session.Get<HoaDon>("HoaDon");

            // Kiểm tra phim đã có trong giỏ hàng chưa
            var chiTiet = hoaDon.ChiTietHoaDons
                .FirstOrDefault(x => x.MaMovie == id);

            if (chiTiet == null)
            {
                chiTiet = new ChiTietHoaDon
                {
                    MaMovie = id,
                    MovieObj = movie,
                    SoLuong = 1
                };

                hoaDon.ChiTietHoaDons.Add(chiTiet);
            }
            else
            {
                chiTiet.SoLuong++;
            }

            // Tính lại tổng tiền và lưu giỏ hàng vào Session
            hoaDon.TongTien = hoaDon.ChiTietHoaDons
                .Sum(x => x.SoLuong * x.MovieObj.Price);

            HttpContext.Session.Set("HoaDon", hoaDon);

            return View(hoaDon);
        }
        // Hiển thị trang nhập thông tin giao hàng
        [HttpGet]
        public IActionResult Checkout()
        {
            return View();
        }
        public IActionResult RemoveFromCart(int maMovies)
        {
            var hoaDon = HttpContext.Session.Get<HoaDon>("HoaDon");

            var chiTiet = hoaDon.ChiTietHoaDons
                .FirstOrDefault(x => x.MaMovie == maMovies);

            if (chiTiet != null)
            {
                hoaDon.ChiTietHoaDons.Remove(chiTiet);
            }

            // Tính lại tổng tiền sau khi xóa
            hoaDon.TongTien = hoaDon.ChiTietHoaDons
                .Sum(x => x.SoLuong * x.MovieObj.Price);

            // Lưu lại giỏ hàng vào Session
            HttpContext.Session.Set("HoaDon", hoaDon);

            return View("AddToCart", hoaDon);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult UpdateCart(int maMovie, int soLuong)
        {
            var hoaDon = HttpContext.Session.Get<HoaDon>("HoaDon");

            if (hoaDon == null)
            {
                return RedirectToAction(nameof(Index));
            }

            var chiTiet = hoaDon.ChiTietHoaDons
                .FirstOrDefault(x => x.MaMovie == maMovie);

            if (chiTiet != null && soLuong >= 1)
            {
                chiTiet.SoLuong = soLuong;
            }

            hoaDon.TongTien = hoaDon.ChiTietHoaDons
                .Sum(x => x.SoLuong * x.MovieObj.Price);

            HttpContext.Session.Set("HoaDon", hoaDon);

            return View("AddToCart", hoaDon);
        }
        // Xử lý khi khách nhấn Hoàn thành
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Checkout(ShippingDetail shippingDetail)
        {
            if (!ModelState.IsValid)
            {
                return View(shippingDetail);
            }

            // Lấy giỏ hàng đang lưu trong Session
            var gioHang = HttpContext.Session.Get<HoaDon>("HoaDon");

            if (gioHang == null || gioHang.ChiTietHoaDons.Count == 0)
            {
                ModelState.AddModelError("", "Giỏ hàng đang trống.");
                return View(shippingDetail);
            }

            // Lưu thông tin giao hàng
            _context.ShippingDetails.Add(shippingDetail);

            // Tạo hóa đơn từ các sản phẩm trong giỏ
            var hoaDon = new HoaDon
            {
                NgayLap = DateTime.Now,
                TongTien = gioHang.TongTien
            };

            foreach (var item in gioHang.ChiTietHoaDons)
            {
                hoaDon.ChiTietHoaDons.Add(new ChiTietHoaDon
                {
                    MaMovie = item.MaMovie,
                    SoLuong = item.SoLuong
                });
            }

            _context.HoaDons.Add(hoaDon);
            await _context.SaveChangesAsync();

            // Xóa giỏ hàng sau khi đã lưu đơn thành công
            HttpContext.Session.Remove("HoaDon");

            // Đọc thông tin Gmail từ User Secrets
            var emailGui = _configuration["Email:Address"];
            var matKhau = _configuration["Email:AppPassword"];

            var tieuDe = "Xác nhận đơn hàng #" + hoaDon.MaHoaDon;
            var noiDung = $"<p>Xin chào {System.Net.WebUtility.HtmlEncode(shippingDetail.Name)},</p>"
                + $"<p>Đơn hàng #{hoaDon.MaHoaDon} của bạn đã được ghi nhận.</p>"
                + $"<p>Tổng tiền: {hoaDon.TongTien:N0} VNĐ</p>"
                + "<p>Cảm ơn bạn đã đặt hàng!</p>";

            bool guiThanhCong = false;

            try
            {
                if (!string.IsNullOrWhiteSpace(emailGui)
                    && !string.IsNullOrWhiteSpace(matKhau))
                {
                    guiThanhCong = await EmailServiceNew.SendMailGoogleSmtp(
                        emailGui,
                        shippingDetail.Email,
                        tieuDe,
                        noiDung,
                        emailGui,
                        matKhau
                    );
                }
            }
            catch (Exception)
            {
                guiThanhCong = false;
            }

            ViewBag.MaHoaDon = hoaDon.MaHoaDon;
            ViewBag.GuiEmailThanhCong = guiThanhCong;

            return View("CheckoutCompleted");
        }
        // GET: Movies
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Movies.Include(m => m.GenreObj);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Movies/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var movie = await _context.Movies
                .Include(m => m.GenreObj)
                .FirstOrDefaultAsync(m => m.ID == id);
            if (movie == null)
            {
                return NotFound();
            }

            return View(movie);
        }

        // GET: Movies/Create
        public IActionResult Create()
        {
            ViewData["GenreID"] = new SelectList(_context.Genres, "ID", "Name");
            return View();
        }

        // POST: Movies/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Movie movie)
        {
            if (ModelState.IsValid)
            {
                // Nếu không chọn ảnh, sử dụng ảnh mặc định
                movie.PicturePath = await SaveImageAsync(movie.PictureUpload)
                                    ?? "/images/no-image.jpg";

                _context.Add(movie);
                await _context.SaveChangesAsync();

                return RedirectToAction(nameof(Index));
            }

            ViewData["GenreID"] = new SelectList(
                _context.Genres,
                "ID",
                "Name",
                movie.GenreID
            );

            return View(movie);
        }

        // GET: Movies/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }
            ViewData["GenreID"] = new SelectList(_context.Genres, "ID", "Name", movie.GenreID);
            return View(movie);
        }

        // POST: Movies/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Movie movie)
        {
            if (id != movie.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var newPath = await SaveImageAsync(movie.PictureUpload);

                    if (newPath != null)
                    {
                        movie.PicturePath = newPath;
                    }
                    else if (string.IsNullOrEmpty(movie.PicturePath))
                    {
                        movie.PicturePath = "/images/no-image.jpg";
                    }

                    _context.Update(movie);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MovieExists(movie.ID))
                    {
                        return NotFound();
                    }

                    throw;
                }

                return RedirectToAction(nameof(Index));
            }

            ViewData["GenreID"] = new SelectList(
                _context.Genres,
                "ID",
                "Name",
                movie.GenreID
            );

            return View(movie);
        }

        // GET: Movies/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var movie = await _context.Movies
                .Include(m => m.GenreObj)
                .FirstOrDefaultAsync(m => m.ID == id);
            if (movie == null)
            {
                return NotFound();
            }

            return View(movie);
        }

        // POST: Movies/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie != null)
            {
                _context.Movies.Remove(movie);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MovieExists(int id)
        {
            return _context.Movies.Any(e => e.ID == id);
        }
    }
}
