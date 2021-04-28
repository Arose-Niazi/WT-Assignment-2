// Constants
const NAME = 0;
const GENDER = 1;
const AGE = 2;
const CITY = 3; 


var CanDelete = true;
var CurrentEditing;
var NamePattern = new RegExp("(^[A-Za-z]{1,10})+$");

// Buttons
var updateButton;
var resetButton;
var addButton;

//Forms Input Fields
var nameInput;
var ageInput;
var maleInput;
var femaleInput;
var cityInput;


// On Load
window.onload = function()
{
    AssignVariables();

    Reset();
    
    //On Click Binding
    resetButton.onclick = Reset;
    updateButton.onclick = UpdateValues;
    addButton.onclick = Add;
}


// Functions
function AssignVariables()
{
    // Buttons
    updateButton = document.getElementById("Update");
    resetButton = document.getElementById("Reset");
    addButton = document.getElementById("Add");

    //Forms Input Fields
    nameInput = document.getElementById("Name");
    ageInput = document.getElementById("Age");
    maleInput = document.getElementById("Male");
    femaleInput = document.getElementById("Female");
    cityInput = document.getElementById("City");

    tableBody = document.getElementById("Persons");

}

function Reset()
{
    updateButton.disabled = true
    nameInput.value = "";
    ageInput.value = "";
    cityInput.value = "Lahore";
    CanDelete = true;
}

function Update(e)
{
    var currentRow = e.target.parentNode.parentNode;
    CurrentEditing = [];

    for (let index = 0; index < currentRow.childNodes.length; index++) {
        const element = currentRow.childNodes[index];
        if(element.tagName == undefined) continue;
        CurrentEditing.push(element)
    }

    nameInput.value = CurrentEditing[NAME].innerText; 
    ageInput.value = CurrentEditing[AGE].innerText; 
    cityInput.value = CurrentEditing[CITY].innerText; 

    if(CurrentEditing[GENDER].innerText === "Male")
        maleInput.checked = true;  
    else
        femaleInput.checked = true;

    addButton.disabled = true;
    updateButton.disabled = false;

    CanDelete = false;
}

function Delete(e)
{
    if(!CanDelete) return;
    e.target.parentNode.parentNode.remove();
}

function UpdateValues()
{
    if(!IsValidInput()) return; 

    CurrentEditing[NAME].innerText = nameInput.value;
    CurrentEditing[AGE].innerText = ageInput.value;
    CurrentEditing[CITY].innerText = cityInput.value;
    if(maleInput.checked)
        CurrentEditing[GENDER].innerText = "Male";
    else
        CurrentEditing[GENDER].innerText = "Female";
}

function Add()
{
    if(!IsValidInput()) return; 

    var tableRow = document.createElement("tr");

    var nameTH = document.createElement("th")
    nameTH.setAttribute("scope", "row");
    nameTH.innerText = nameInput.value;

    var genderTD = document.createElement("td");
    if(maleInput.checked)
        genderTD.innerText = "Male";
    else
        genderTD.innerText = "Female";

    var ageTD = document.createElement("td");
    ageTD.innerText = ageInput.value;

    var cityTD = document.createElement("td");
    cityTD.innerText = cityInput.value;

    var buttonsTD = document.createElement("td");
    var updateA = document.createElement("a");
    updateA.setAttribute("href", "#");
    updateA.setAttribute("onclick", "Update(event)");
    updateA.innerText = "Update";

    var buttonGapText = document.createTextNode(" / ");

    var deleteA = document.createElement("a");
    deleteA.setAttribute("href", "#");
    deleteA.setAttribute("onclick", "Delete(event)");
    deleteA.innerText = "Delete";

    buttonsTD.appendChild(updateA);
    buttonsTD.appendChild(buttonGapText);
    buttonsTD.appendChild(deleteA);

    tableRow.appendChild(nameTH);
    tableRow.appendChild(genderTD);
    tableRow.appendChild(ageTD);
    tableRow.appendChild(cityTD);
    tableRow.appendChild(buttonsTD);
    tableBody.appendChild(tableRow);
}

function IsValidInput() {
    if(!NamePattern.test(nameInput.value))
    {
        alert("Incorrect Name:\n\tPlease use alphabets only.\n\tMinimum length: 1\n\tMaximum Length: 1");
        return false;
    }

    if(ageInput.value < 10 || ageInput.value > 50)
    {
        alert("Incorrect Age:\n\tMinimum Age: 10\n\tMaximum Age: 50");
        return false;
    }

    return true;
}