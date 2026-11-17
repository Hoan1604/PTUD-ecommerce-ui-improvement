/* code goes here */
var msg = document.getElementById("msgArea");
msg.value = "here is some text";
document.getElementById("pageTitle").innerHTML = "Even newer title";

// Đọc nội dung HTML, văn bản và thuộc tính của các phần tử.
msg.value = document.getElementById("first").innerHTML;
msg.value = document.getElementById("first").innerText;
msg.value = "My class is " + msg.getAttribute("class");

var elements = document.getElementsByTagName("textarea");
elements[0].value = "selected by tag name";
elements = document.getElementsByTagName("span");
for (var i = 0; i < elements.length; i++) {
    msg.value += "\n" + elements[i].innerText;
}

msg.value = "";
var counts = document.getElementsByClassName("count-number");
for (var j = 0; j < counts.length; j++) {
    msg.value += "\n" + counts[j].innerText;
}

var paragraph = document.querySelector("#first p");
msg.value = paragraph.innerHTML;
var paragraphs = document.querySelectorAll("#first p");
for (var k = 0; k < paragraphs.length; k++) {
    msg.value += paragraphs[k].innerHTML + "\n";
}

msg.setAttribute("class", "hidden");
document.getElementById("features").style.backgroundColor = "green";
