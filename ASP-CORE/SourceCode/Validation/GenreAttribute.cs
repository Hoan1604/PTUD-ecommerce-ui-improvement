using System.ComponentModel.DataAnnotations;
using _31241028406_VuVanHoan.Data;

namespace _31241028406_VuVanHoan.Validation;

public class GenreAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(
        object value,
        ValidationContext validationContext)
    {
        if (value == null || !int.TryParse(value.ToString(), out int genreID))
        {
            return new ValidationResult(
                ErrorMessage ?? "Vui lòng chọn thể loại hợp lệ."
            );
        }

        var context = (ApplicationDbContext)validationContext
            .GetService(typeof(ApplicationDbContext));

        if (context.Genres.Any(x => x.ID == genreID))
        {
            return ValidationResult.Success;
        }

        return new ValidationResult(
            ErrorMessage ?? "Thể loại không tồn tại."
        );
    }
}