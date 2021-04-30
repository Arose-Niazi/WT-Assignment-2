// Constants Using to remember what is stored where in an array.
const NAME = 0;
const GENDER = 1;
const AGE = 2;
const CITY = 3;

var CanDelete = true;
var CurrentEditing;
var NamePattern = new RegExp("(^[A-Za-z]{1,10})+$"); //Only allow Alphabets with size between 1 to 10.

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
window.onload = function () {
    AssignVariables();

    Reset();

    //On Click Binding
    resetButton.onclick = Reset;
    updateButton.onclick = UpdateValues;
    addButton.onclick = Add;
};

// Functions
function AssignVariables() {
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

    //Table Body where we will insert data.
    tableBody = document.getElementById("Persons");
}

function Reset() {
    updateButton.disabled = true; //This will diable the update button
    addButton.disabled = false; //This will enable the add button

    //Resetting the values in form to a default value.
    nameInput.value = "";
    ageInput.value = "";
    cityInput.value = "Lahore";

    //To check if we can use the delete button.
    CanDelete = true;
}

function Update(e) {
    var currentRow = e.target.parentNode.parentNode; //Getting parent of 'a' -> 'td' -> 'tr' So we got the row
    CurrentEditing = []; //Stores the childs 'td' we need

    for (let index = 0; index < currentRow.childNodes.length; index++) {
        //Loop through all childs of currentRow
        const element = currentRow.childNodes[index]; //Getting the child.
        if (element.tagName == undefined) continue; //If that element is undefined that means, it's extra we don't need it.
        CurrentEditing.push(element); //Add the childs in currrent Editng list.
    }

    //Updating the form with the values
    nameInput.value = CurrentEditing[NAME].innerText;
    ageInput.value = CurrentEditing[AGE].innerText;
    cityInput.value = CurrentEditing[CITY].innerText;

    //Gender checking
    if (CurrentEditing[GENDER].innerText === "Male") maleInput.checked = true;
    //Check the male radio button
    else femaleInput.checked = true; //Check the female radio button

    addButton.disabled = true; //Now adding new value is disabled.
    updateButton.disabled = false; //Enable the update button.

    CanDelete = false; //As we are editing a value, can not delete anymore.
}

function Delete(e) {
    if (!CanDelete) return;
    e.target.parentNode.parentNode.remove(); //Getting parent of 'a' -> 'td' -> 'tr' So we got the row and remove() will delete it.
}

function UpdateValues() {
    //Input validation
    if (!IsValidInput()) return;

    //Updating the values in table.
    CurrentEditing[NAME].innerText = nameInput.value;
    CurrentEditing[AGE].innerText = ageInput.value;
    CurrentEditing[CITY].innerText = cityInput.value;
    if (maleInput.checked) CurrentEditing[GENDER].innerText = "Male";
    else CurrentEditing[GENDER].innerText = "Female";
}

function Add() {
    //Input validation
    if (!IsValidInput()) return;

    //If male radio button is checked then male else female.
    var gender = maleInput.checked ? "Male" : "Female";

    //Adding new row to table body
    tableBody.innerHTML +=
        "<tr>" +
        '<td scope="row">' +
        nameInput.value +
        "</td>" +
        "<td>" +
        gender +
        "</td>" +
        "<td>" +
        ageInput.value +
        "</td>" +
        "<td>" +
        cityInput.value +
        "</td>" +
        '<td><a href="#" onclick="Update(event)">Update</a> / <a href="#" onclick="Delete(event)">Delete</a></td>' +
        "</tr>";

    //Reseting the form.
    Reset();
}

function IsValidInput() {
    //Matches name with regex pattern
    if (!NamePattern.test(nameInput.value)) {
        alert(
            "Incorrect Name:\n\tPlease use alphabets only.\n\tMinimum length: 1\n\tMaximum Length: 1"
        );
        return false;
    }

    if (ageInput.value < 10 || ageInput.value > 50) {
        alert("Incorrect Age:\n\tMinimum Age: 10\n\tMaximum Age: 50");
        return false;
    }

    if (!cityInput.value) {
        alert("Incorrect City:\n\tPlease enter a city name, or select from list.");
        return false;
    }

    return true;
}
