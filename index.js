import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const appSettings = {
    databaseURL: "https://sigma-cbe42-default-rtdb.europe-west1.firebasedatabase.app/"
};

const inputField = document.getElementById("inputField");
const submitBtn = document.getElementById("submitBtn");
const shoppingList = document.getElementById("shoppingList");

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

submitBtn.addEventListener("click", function() {
    let inputValue = inputField.value;
    
    push(shoppingListInDB, inputValue);

    addToLocalList(inputValue);

    clearInputField();
})


onValue(shoppingListInDB, function(snapshot){
    let itemsArray = Object.values(snapshot.val())

    for(let i = 0; i < itemsArray.length; i++){
        console.log(itemsArray[i])
    }
})


function clearInputField(){
    inputField.value = "";
}

function addToLocalList(input){
    shoppingList.innerHTML += `<li>${input}</li>`;
}