
/* add code here */
var daysOfWeek = new Array("Mon", "Tues", "Wed", "Thur", "Fri");

daysOfWeek.push("Sat");
daysOfWeek.unshift("Sun");

document.write("<table border='1'>");
document.write("<tr>");

for (var i = 0; i < daysOfWeek.length; i++) {
  var day = daysOfWeek[i];

  if (day.length >= 4) {
    day = "<em>" + day + "</em>";
  }

  document.write("<th>" + day + "</th>");
}

document.write("</tr>");

for (var date = 1; date <= 30; date++) {
  // Bắt đầu một hàng mới vào Chủ nhật.
  if ((date - 1) % 7 === 0) {
    document.write("<tr>");
  }

  document.write("<td>" + date + "</td>");

  // Kết thúc hàng vào thứ Bảy hoặc ngày cuối cùng.
  if (date % 7 === 0 || date === 30) {
    document.write("</tr>");
  }
}

document.write("</table>");
