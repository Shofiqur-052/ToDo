
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
    addList(value);
}

// Create and Add item to the List
function addList(value) {
    var ul = document.getElementById("todoList");
    var li = document.createElement("li");         // Creating list item
    li.appendChild(document.createTextNode(value));
    // 
    ul.appendChild(li);
}

// Selected Item - Hover
function selectItem(event) {
    console.log(event.target.innerText);
    if(event.target.value == undefined) return ;

    if(event.target.value == 0) {
        event.target.style.backgroundColor = "lightBlue";
    } else {
        event.target.style.backgroundColor = "rgb(225, 205, 176)";
    }
    event.target.value ^= 1;
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
}

// Default state of 'selected all' button
function selectedButtonDefaultState() {
    let button = document.getElementById("selectButtonID");
    button.innerText = "Select All";
    button.value = 0;
}

// Select All Items
function selectAllItem() {
    let ul = document.getElementById("todoList");
    let items = ul.getElementsByTagName("li");

    if(items.length == 0) return ;

    for(let i=items.length-1; i>=0; i--){
        items[i].value = 1;
        items[i].style.backgroundColor = "lightBlue";
    }
    let button = document.getElementById("selectButtonID");
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
        items[i].value = 0;
        items[i].style.backgroundColor = "rgb(225, 205, 176)";
    }
}