const showElement = element => {
    element.style.display = "block";
};

const showMode = () => {
    let modeDiv = document.querySelector(".mode");
    showElement(modeDiv);
};

function createNameInput() {
    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter Name";
    nameInput.className = "nameInput"
    return nameInput;
}

function createGenderSwitch() {
    let switchElem = document.createElement("label");
    switchElem.className = "switch";
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    let span = document.createElement("span");
    span.className = "slider round";
    switchElem.appendChild(checkbox);
    switchElem.appendChild(span);
    return switchElem;
}

const createNameSection = () => {
    let nameDiv = document.createElement("div");
    nameDiv.className = "nameSection";
    let nameInput = createNameInput();
    let switchElem = createGenderSwitch();
    nameDiv.appendChild(nameInput);
    nameDiv.appendChild(switchElem);
    return nameDiv;
};

function appendInitialNameSections(namesDiv) {
    let firstNameSection = createNameSection();
    let secondNameSection = createNameSection();
    namesDiv.appendChild(firstNameSection);
    namesDiv.appendChild(secondNameSection);
}

function createButton(innerText) {
    let button = document.createElement("button");
    button.type = "button";
    button.innerText = innerText;
    return button;
}

const createButtonsDiv = () => {
    let buttonsDiv = document.createElement("div");
    let addButton = createButton("+");
    let removeButton = createButton("-");
    buttonsDiv.appendChild(addButton);
    buttonsDiv.appendChild(removeButton);
    return buttonsDiv;
};

const appendButtons = namesDiv => {
    namesDiv.appendChild(createButtonsDiv());
};

const showNames = () => {
    let namesDiv = document.querySelector(".names");
    appendInitialNameSections(namesDiv);
    appendButtons(namesDiv);
    showElement(namesDiv)
};

const showForm = () => {
    showNames();
};

const onload = () => {
    showForm();
};
window.onload = onload;