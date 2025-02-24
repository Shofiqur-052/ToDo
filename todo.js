
let inputBox = document.getElementById("todoTextBox");
inputBox.addEventListener("keypress", function(event){
    if(event.key == "Enter"){
        saveItem();
    }
});

// Save Item to the List
function saveItem () {
    let textBox = document.getElementById("todoTextBox");
    const value = textBox.value;
    textBox.value = "";

    if(value.trim().length == 0){
        alert("Empty Field :(");
        return ;
    }
    showAllTask();
    addList(value);
}

// Create and Add item to the List
function addList(value) {
    var ul = document.getElementById("todoList");
    var li = document.createElement("li");

    console.log(ul);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.id = "deleteBtnID";
    deleteBtn.style.backgroundColor = "rgb(255, 147, 147)";

    const button = document.createElement("button");
    button.innerHTML = 'Incomplete';
    button.id = "buttonIsCompleted";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.id = "editBtnID";
    editBtn.style.backgroundColor = "rgb(138, 197, 255)";

    li.appendChild(document.createTextNode(value));
    li.appendChild(button);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
}

// Check Event Items
function selectItemEventCheck(event) {

    if(event.target.id == "deleteBtnID") {
        clickedSingleDeleteButton(event);
        return ;
    }
    if(event.target.id == "inputEditID") return ;

    if(event.target.id == "editBtnID") {
        if(event.target.textContent == "Edit"){
            editTextOnListItem(event);
        } else {
            saveTextOnListItem(event);
        }
        return ;
    }
    if(event.target.value == undefined) return ;

    let evt = event.target.closest('li');
    selectItem(evt);

    let buttonSlt = document.getElementById("selectBtnID");
    if(checkAllSelected()==true){
        buttonSlt.value = 1;
        buttonSlt.innerText = "Unselect All";
    } else {
        buttonSlt.value = 0;
        buttonSlt.innerText = "Select All";
    }
}

// Check all items are selected or not
function checkAllSelected() {
    let ul = document.getElementById("todoList");
    let items = ul.getElementsByTagName("li");

    if(items.length == 0) return false;
    let cnt = 0;

    for(let i=0; i<items.length; i++){
        cnt+=items[i].value;
    }
    console.log(cnt);
    if(cnt == items.length) return true;
    else return false;
}

// Edit Text on List Item
function editTextOnListItem(event) {
    let evt = event.target.closest('li');

    let input = document.createElement("input");
    input.id = "inputEditID";
    input.value = evt.firstChild.nodeValue.trim();

    input.addEventListener("keypress", function(eventGot){
        if(eventGot.key == "Enter"){
            saveTextOnListItem(event);
            return ;
        }
    });
    let firstChild = evt.firstChild;
    evt.insertBefore(input, firstChild);

    event.target.innerHTML = "Save";
    event.target.style.backgroundColor = "lightGreen";
    evt.querySelector('#buttonIsCompleted').style.display = "none";
}

// Save Edited text on list item
function saveTextOnListItem(event) {
    let evt = event.target.closest('li');
    let inputValue = evt.querySelector('#inputEditID').value;

    console.log(inputValue);

    evt.querySelector('#buttonIsCompleted').style.display = "";
    evt.querySelector('#inputEditID').remove();
    evt.firstChild.nodeValue = inputValue;
    event.target.innerHTML = "Edit";
    event.target.style.backgroundColor = "rgb(138, 197, 255)";
}

// Selected Item - Hover
function selectItem(evt) {
    let evtButton = evt.querySelector('#buttonIsCompleted');

    if(evt.value == 0) {
        evt.style.backgroundColor = "lightGreen";
        evtButton.style.backgroundColor = "lightGreen";
        evtButton.innerText = "Completed";
    } else {
        evt.style.backgroundColor = "";
        evtButton.style.backgroundColor = "";
        evtButton.innerText = "Incomplete";
    }
    evt.value ^= 1;
}

// Delete single selected item
function clickedSingleDeleteButton(event) {
    event.target.closest('li').remove();
}

// Default state of 'selected all' button
function selectedButtonDefaultState() {
    let button = document.getElementById("selectBtnID");
    button.innerText = "Select All";
    button.value = 0;
}

// Select All Items
function selectAllItem() {
    let ul = document.getElementById("todoList");
    let items = ul.getElementsByTagName("li");

    resetButtonHover("selectBtnID");
    if(items.length == 0) return ;

    for(let i=items.length-1; i>=0; i--){
        items[i].value = 0;
        items[i].style.display = "";
        selectItem(items[i]);
    }
    let button = document.getElementById("selectBtnID");
    button.value ^= 1;
    
    if(button.value == 1){
        button.innerText = "Unselect All";
    } else {
        button.innerText = "Select All";
        unselectAllItems();
    }
}

// Unselect All Items
function unselectAllItems() {
    let ul = document.getElementById("todoList");
    let items = ul.getElementsByTagName("li");

    for(let i=items.length-1; i>=0; i--){
        items[i].value = 1;
        items[i].style.display = "";
        selectItem(items[i]);
    }
}

// Show All Completed Task
function showCompletedTask() {
    let ul = document.getElementById("todoList");
    let items = ul.getElementsByTagName("li");

    for(let i=items.length-1; i>=0; i--){
        if(items[i].value == 0) {
            items[i].style.display = "none";
        } else {
            items[i].style.display = "";
        }
    }
    resetButtonHover("completedTaskBtnID");
}

// Show All Remaining Task
function showRemainingTask() {
    let ul = document.getElementById("todoList");
    let items = ul.getElementsByTagName("li");

    for(let i=items.length-1; i>=0; i--){
        if(items[i].value == 0) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
    resetButtonHover("remainingTaskBtnID");
}

// Show All Task
function showAllTask() {
    let ul = document.getElementById("todoList");
    let items = ul.getElementsByTagName("li");

    for(let i=items.length-1; i>=0; i--){
        items[i].style.display = ""
    }
    resetButtonHover("showAllBtnID");
}

// Delete Completed Task
function clearCompletedTask() {
    let ul = document.getElementById("todoList");
    let items = ul.getElementsByTagName("li");

    for(let i=items.length-1; i>=0; i--){
        if(items[i].querySelector("button").innerHTML == "Completed"){
            items[i].remove();
        }
    }
    resetButtonHover("clearCompletedBtnID");
}

// Reset Button Hover effect
function resetButtonHover(buttonID) {
    let selectAllBtn = document.getElementById("selectBtnID");
    let completedTaskBtn = document.getElementById("completedTaskBtnID");
    let remainingTaskBtn = document.getElementById("remainingTaskBtnID");
    let showAllBtn = document.getElementById("showAllBtnID");
    let clearCompletedBtn = document.getElementById("clearCompletedBtnID");

    selectAllBtn.style.backgroundColor = "";
    completedTaskBtn.style.backgroundColor = "";
    remainingTaskBtn.style.backgroundColor = "";
    showAllBtn.style.backgroundColor = "";
    clearCompletedBtn.style.backgroundColor = "";

    if(buttonID == "selectBtnID") selectAllBtn.style.backgroundColor = "lightBlue";
    if(buttonID == "completedTaskBtnID") completedTaskBtn.style.backgroundColor = "lightBlue";
    if(buttonID == "remainingTaskBtnID") remainingTaskBtn.style.backgroundColor = "lightBlue";
    if(buttonID == "showAllBtnID") showAllBtn.style.backgroundColor = "lightBlue";
    if(buttonID == "clearCompletedBtnID") clearCompletedBtn.style.backgroundColor = "lightBlue";
}

