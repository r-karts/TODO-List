const statusCancel = 'Cancel';
const statusDone = 'Done';
const remove = 'Remove';
const classSuccess = 'trSuccess';

window.onload = function() {
    document.getElementById('file-input').addEventListener('change', readSingleFile, false); // listener to open file
    currentDate();
    let dataString = localStorage.getItem('list_tr');
    let data = JSON.parse(dataString);
    for (let i = data.length - 1; i >= 0; i--) {
        addItem(data[i].text, data[i].date, data[i].success);
    }
}


function clickToCreate() {
    if (document.getElementById('todo').value) {
        addItem(document.getElementById('todo').value, document.getElementById('meeting').value, false);
        return;
    }

    alert('TODO input field is empty!');
}

function addItem(text, date, success) {
    let flexWrap = document.getElementsByClassName('flex-wrap')[0];
    let divText = document.createElement('div');
    let divDate = document.createElement('div');
    let divRow = document.createElement('div');

    console.log(flexWrap);

    divText.innerHTML = text;
    divDate.innerHTML = date;
    divRow.appendChild(divText);
    divRow.appendChild(divDate);
    if (success) {
        divRow.className = classSuccess + ' ';
    }
    addButton(divRow);
    divRow.className += 'flex-rows';
    flexWrap.appendChild(divRow);
    saveData();

}

function saveData() {
    let tableArr = document.getElementsByClassName('flex-wrap')[0].childNodes;
    let arrayData = [];

    for (let i = tableArr.length - 1; i > 0; i--) {
        arrayData.push({
            'text': tableArr[i].childNodes[0].innerHTML,
            'date': tableArr[i].childNodes[1].innerHTML,
            'success': tableArr[i].classList.contains(classSuccess)
        })
    }
    localStorage.setItem('list_tr', JSON.stringify(arrayData));

}

function addButton(divRow) {
    let divSuccess = document.createElement('div');
    let divRemove = document.createElement('div');

    divSuccess.className = 'successButton';
    divRemove.className = 'removeButton';

    if (divRow.classList.contains(classSuccess)) {
        divSuccess.innerHTML = statusCancel;
    } else {
        divSuccess.innerHTML = statusDone;
    }
    divRemove.innerHTML = remove;

    divSuccess.onclick = function changeStatus(event) {
        let divRow = event.target.parentElement;
        switch (this.innerHTML) {
            case statusDone:
                {
                    divRow.classList.add(classSuccess);
                    this.innerHTML = statusCancel;
                    break;
                };
            case statusCancel:
                {
                    divRow.classList.remove(classSuccess);
                    this.innerHTML = statusDone;
                    break;
                }
        }
        saveData();
    }

    divRemove.onclick = function changeStatus(event) {
        let removeDiv = event.target.parentElement;
        removeDiv.remove();
        saveData();
    }

    divRow.appendChild(divSuccess);
    divRow.appendChild(divRemove);
}

function currentDate() {
    document.getElementById('meeting').valueAsDate = new Date();
}

function readSingleFile(e) {
    let file = e.target.files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();

    reader.onload = function(e) {
        let contents = e.target.result;
        displayContents(contents);
    };
    reader.readAsText(file);
    this.value = '';
}

function displayContents(contents) {
	console.log("+");
    let data = JSON.parse(contents);
    for (let i = data.length - 1; i >= 0; i--) {
        addItem(data[i].text, data[i].date, data[i].success);
    }

}

function saveFile() {
    let tableArr = document.getElementsByClassName('flex-wrap')[0];
    	tableArr = tableArr.children;
    let arrayData = [];
    for (let i = tableArr.length - 1; i > 0; i--) {

        arrayData.push({
            'text': tableArr[i].childNodes[0].innerHTML,
            'date': tableArr[i].childNodes[1].innerHTML,
            'success': tableArr[i].classList.contains(classSuccess)
        })
    }

    uriContent = 'data:application/octet-stream,' + encodeURIComponent(JSON.stringify(arrayData));

    document.getElementById('save').href = uriContent;
    document.getElementById('save').download = 'data.txt';
}

function clearTable() {
	let parent = document.getElementsByClassName('flex-wrap')[0];
    for (var i = parent.children.length - 1; i >= 0; i--) {
        parent.children[i].remove();
    }
    saveData();
}