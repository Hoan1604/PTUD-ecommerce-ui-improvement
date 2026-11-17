/* code goes here */
var btn = document.getElementById("testButton");
var img = document.getElementById("mainImage");

function simpleHandler(event) {
    var content = document.getElementById("content");
    if (btn.innerHTML === "Hide") {
        btn.innerHTML = "Show";
        content.className = "makeItDisappear";
        setTimeout(function () {
            content.style.display = "none";
        }, 1000);
    } else {
        btn.innerHTML = "Hide";
        content.style.display = "block";
        setTimeout(function () {
            content.className = "makeItNormal";
        }, 500);
    }
}

btn.addEventListener("click", simpleHandler);
img.addEventListener("mouseover", function () {
    img.className = "makeItGray";
});
img.addEventListener("mouseout", function () {
    img.className = "makeItNormal";
});

