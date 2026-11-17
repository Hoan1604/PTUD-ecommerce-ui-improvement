/* code goes here */
var stories = document.getElementById("stories");
for (var i = 0; i < stories.childNodes.length; i++) {
    var child = stories.childNodes[i];
    console.log("child " + i + " = " + child + " nodeType=" + child.nodeType);
}

var first = document.getElementById("first");
for (var j = 0; j < first.childNodes.length; j++) {
    var node = first.childNodes[j];
    if (node.nodeType === 1) {
        node.style.backgroundColor = "lightgreen";
    }
}
