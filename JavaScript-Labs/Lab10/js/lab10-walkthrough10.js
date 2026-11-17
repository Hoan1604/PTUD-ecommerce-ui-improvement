$(function () {
    $(".animLoading").hide();

    $("#consume").click(function () {
        var list = $("#results ul");
        list.empty();
        $(".animLoading").show();

        $.getJSON("data/cities.json")
            .done(function (data) {
                $.each(data, function (index, city) {
                    $("<li></li>").text(city.name).appendTo(list);
                });
            })
            .fail(function (xhr, status, error) {
                alert("failed loading data - status=" + status + " error=" + error);
            })
            .always(function () {
                $(".animLoading").fadeOut("slow");
            });
    });
});
