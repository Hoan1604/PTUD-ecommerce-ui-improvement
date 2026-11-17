/* code goes here */
function checkForEmptyFields(e) {
    var errorArea = document.getElementById("errors");
    errorArea.className = "hidden";

    var fields = document.querySelectorAll('input[type="text"], input[type="password"]');
    var fieldList = [];
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].value === "") {
            fieldList.push(fields[i].id);
        }
    }

    if (fieldList.length > 0) {
        e.preventDefault();
        errorArea.textContent = "The following fields can't be empty: " + fieldList.join(", ");
        errorArea.className = "visible";
    }
}

window.addEventListener("load", function () {
    document.getElementById("sampleForm").addEventListener("submit", checkForEmptyFields);
});

