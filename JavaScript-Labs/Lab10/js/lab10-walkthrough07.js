/* put your animation code here */
$(function () {
    $("figure img")
        .on("mouseover", function () {
            var alt = $(this).attr("alt");
            var src = $(this).attr("src").replace("small", "medium");
            var preview = $('<div id="preview"></div>');
            var image = $("<img>").attr({ src: src, alt: alt });
            var caption = $("<p></p>").text(alt);
            preview.append(image).append(caption);
            $("body").append(preview);
            $(this).addClass("gray");
            preview.fadeIn(1000);
        })
        .on("mouseleave", function () {
            $(this).removeClass("gray");
            $("#preview").remove();
        })
        .on("mousemove", function (e) {
            $("#preview").css({ top: (e.pageY - 10) + "px", left: (e.pageX + 30) + "px" });
        });
});

