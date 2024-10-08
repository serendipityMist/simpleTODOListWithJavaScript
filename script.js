const todoInput = document.querySelector(".todoInput");
const container = document.querySelectorAll(".tasksHolder");
const type1 = document.querySelector("#type1");
const type2 = document.querySelector("#type2");
let dataArray = JSON.parse(localStorage.getItem("tasks")) || [];
let id = dataArray.length > 0 ? dataArray[dataArray.length - 1].id : 0; 
let inputVal;
let obj;


window.onload = () => {
    dataArray.forEach(task => {
        if (task.type === "type1") {
            addData("type1");
        } else if (task.type === "type2") {
            addData("type2");
        }
    });
};

function addButton() {
    inputVal = todoInput.value.trim(); 
    console.log(inputVal);

    if (inputVal !== "") {
        id++;
        
       
        if (type1.checked) {
            obj = { taskName: inputVal, id: id, type: "type1" };
            dataArray.push(obj); 
            saveToLocalStorage();
            addData("type1");     
            console.log("I am type one");
        }
        else if (type2.checked) {
            obj = { taskName: inputVal, id: id, type: "type2" };
            dataArray.push(obj); 
            saveToLocalStorage();
            addData("type2");    
            console.log("I am type two");
        } else {
            return alert("Please select a task type.");
        }

        todoInput.value = ""; 
        console.log(dataArray);
    } else {
        return alert("Value must be inserted");
    }
}

function addData(type) {
    
    if (type === "type1") {
        container[0].innerHTML = ""; 
        dataArray.filter(task => task.type === "type1").forEach((element) => {
            container[0].innerHTML += `
            <div id="task-${element.id}">
                <p>${element.taskName}</p>
                <button onclick="deleteData(${element.id}, 'type1')">Remove</button>
            </div>`;
        });
    } else if (type === "type2") {
        container[1].innerHTML = ""; 
        dataArray.filter(task => task.type === "type2").forEach((element) => {
            container[1].innerHTML += `
            <div id="task-${element.id}">
                <p>${element.taskName}</p>
                <button onclick="deleteData(${element.id}, 'type2')">Remove</button>
            </div>`;
        });
    }
}

function deleteData(id, type) {
    console.log("Deleting task with ID:", id);

    
    dataArray = dataArray.filter((element) => element.id !== id);

    console.log("Updated Data Array:", dataArray);

    saveToLocalStorage();
   
    addData(type);  
}
function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(dataArray));
}