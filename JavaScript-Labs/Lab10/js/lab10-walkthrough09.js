$(function () {
    $("#consume").click(function () {
        var list = $("<ul></ul>");
        $("#results").empty().append(list);
        $.getJSON("data/cities.json", function (data) {
            $.each(data, function (index, city) {
                $("<li></li>").text(city.name).appendTo(list);
            });
        }).fail(function () {
            $("#results").text("Không tải được dữ liệu thành phố.");
        });
    });
});
