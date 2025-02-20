
let input = document.getElementById("todoTextBox");
input.addEventListener("keypress", function(event){
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

    const button = document.createElement("button");
    button.innerHTML = 'Incomplete';
    button.id = "buttonIsCompleted";

    li.appendChild(document.createTextNode(value));
    li.appendChild(button);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
}

// Check Event Items
function selectItemEventCheck(event) {
    if(event.target.id == "deleteBtnID") {
        clickedSingleDeleteButton(event);
        return ;
    }
    console.log(event.target.id);
    if(event.target.value == undefined) return ;

    let evt = event.target.closest('li');
    selectItem(evt);
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
    let button = document.getElementById("selectBtnID");

    for(let i=items.length-1; i>=0; i--){
        items[i].value = 1;
        selectItem(items[i]);
    }
}

// Remove Selected Items
function removeSelectedItem() {
    let ul = document.getElementById("todoList");
    let items = ul.getElementsByTagName("li");

    for(let i=items.length-1; i>=0; i--){
        if(items[i].value == 1){
            items[i].remove();
        }
    }
    selectedButtonDefaultState();
    resetButtonHover("removeSelectedBtnID");
}

// Show All Completed Task
function showCompletedTask() {
    let ul = document.getElementById("todoList");
    let items = ul.getElementsByTagName("li");

    for(let i=items.length-1; i>=0; i--){
        if(items[i].querySelector("button").innerHTML == "Incomplete") {
            items[i].style.display = "none";
        } else {
            items[i].style.display = "";
        }
    }
    unselectAllItems();
    resetButtonHover("completedTaskBtnID");
}

// Show All Remaining Task
function showRemainingTask() {
    let ul = document.getElementById("todoList");
    let items = ul.getElementsByTagName("li");

    for(let i=items.length-1; i>=0; i--){
        if(items[i].querySelector("button").innerHTML == "Incomplete") {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
    unselectAllItems();
    resetButtonHover("remainingTaskBtnID");
}

// Show All Task
function showAllTask() {
    let ul = document.getElementById("todoList");
    let items = ul.getElementsByTagName("li");

    for(let i=items.length-1; i>=0; i--){
        items[i].style.display = ""
    }
    unselectAllItems();
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
    unselectAllItems();
    resetButtonHover("clearCompletedBtnID");
}

// Reset Button Hover effect
function resetButtonHover(buttonID) {
    let selectAllBtn = document.getElementById("selectBtnID");
    let removeSelectedBtn = document.getElementById("removeSelectedBtnID");
    let completedTaskBtn = document.getElementById("completedTaskBtnID");
    let remainingTaskBtn = document.getElementById("remainingTaskBtnID");
    let showAllBtn = document.getElementById("showAllBtnID");
    let clearCompletedBtn = document.getElementById("clearCompletedBtnID");

    selectAllBtn.style.backgroundColor = "";
    removeSelectedBtn.style.backgroundColor = "";
    completedTaskBtn.style.backgroundColor = "";
    remainingTaskBtn.style.backgroundColor = "";
    showAllBtn.style.backgroundColor = "";
    clearCompletedBtn.style.backgroundColor = "";

    if(buttonID == "selectBtnID") selectAllBtn.style.backgroundColor = "lightBlue";
    if(buttonID == "removeSelectedBtnID") removeSelectedBtn.style.backgroundColor = "lightBlue";
    if(buttonID == "completedTaskBtnID") completedTaskBtn.style.backgroundColor = "lightBlue";
    if(buttonID == "remainingTaskBtnID") remainingTaskBtn.style.backgroundColor = "lightBlue";
    if(buttonID == "showAllBtnID") showAllBtn.style.backgroundColor = "lightBlue";
    if(buttonID == "clearCompletedBtnID") clearCompletedBtn.style.backgroundColor = "lightBlue";
}
