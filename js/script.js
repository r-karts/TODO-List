window.onload = function() {
    document.getElementById('file-input').addEventListener('change', readSingleFile, false); // listener to open file
    currentDate();
    var dataString = localStorage.getItem("list_tr");
    var data = JSON.parse(dataString);
    for (var i = data.length - 1; i >= 0; i--) {
        addFunction(data[i].text, data[i].date, data[i].success);
    }
}


function clickFunction() {

    savefile(); //----test

    if (document.getElementById("todo").value !== '') {
        addFunction(document.getElementById("todo").value, document.getElementById("meeting").value, false);
    } else {
        alert("TODO input field is empty!");
    }
}

function addFunction(text, date, success) {
    var table = document.getElementById("table");
    var tdText = document.createElement("td");
    var tdDate = document.createElement("td");
    var tr = document.createElement("tr");

    tdText.innerHTML = text;
    tdDate.innerHTML = date;
    tr.appendChild(tdText);
    tr.appendChild(tdDate);
    if (success) {
        tr.className = "trSuccess";
    }
    addButton(tr);
    table.appendChild(tr);
    saveData();

}

function saveData() {

    var tableArr = document.getElementById("table").childNodes;
    var ArrayData = [];

    for (var i = tableArr.length - 1; i > 0; i--) {
        ArrayData.push({
            'text': tableArr[i].childNodes[0].innerHTML,
            'date': tableArr[i].childNodes[1].innerHTML,
            'success': tableArr[i].classList.contains("trSuccess")
        })
    }
    localStorage.setItem("list_tr", JSON.stringify(ArrayData));

}

function addButton(tr) {
    var tdSuccess = document.createElement("td");
    var tdRemove = document.createElement("td");

    tdSuccess.className = "SuccessButton";
    tdRemove.className = "RemoveButton";

    if (tr.classList.contains("trSuccess")) {
        tdSuccess.innerHTML = "Cansel";
    } else {
        tdSuccess.innerHTML = "Done";
    }
    tdRemove.innerHTML = "Remove";

    tdSuccess.onclick = function changeStatus(event) {
        var tr = event.target.parentElement;
        switch (this.innerHTML) {
            case "Done":
                {
                    tr.className = "trSuccess";
                    this.innerHTML = "Cansel";
                    break;
                };
            case "Cansel":
                {
                    tr.className = "";
                    this.innerHTML = "Done";
                    break;
                }
        }
        saveData();
    }

    tdRemove.onclick = function changeStatus(event) {
        var tr = event.target.parentElement;
        tr.remove();
        saveData();
    }

    tr.appendChild(tdSuccess);
    tr.appendChild(tdRemove);
}

function currentDate() {
    document.getElementById("meeting").valueAsDate = new Date();
}

function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();

    reader.onload = function(e) {
        var contents = e.target.result;
        displayContents(contents);
    };
    reader.readAsText(file);
}

function displayContents(contents) {
    var data = JSON.parse(contents);
    for (var i = data.length - 1; i >= 0; i--) {
        addFunction(data[i].text, data[i].date, data[i].success);
    }

}

function savefile() {

    var tableArr = document.getElementById("table").childNodes;
    var ArrayData = [];

    for (var i = tableArr.length - 1; i > 0; i--) {
        ArrayData.push({
            'text': tableArr[i].childNodes[0].innerHTML,
            'date': tableArr[i].childNodes[1].innerHTML,
            'success': tableArr[i].classList.contains("trSuccess")
        })
    }

    uriContent = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(ArrayData));

    document.getElementById("test").innerHTML = "<a href=" + uriContent + " download=\"savedfile.txt\">Here is the download link</a>";
}