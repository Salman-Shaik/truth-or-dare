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
    nameInput.className = "nameInput masculineInput";
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

const createGenderSpan = () => {
    let span = document.createElement("span");
    span.className = "masculine";
    span.innerText = "♂";
    return span;
};

const createNameSection = () => {
    let nameDiv = document.createElement("div");
    nameDiv.className = "nameSection";
    let nameInput = createNameInput();
    let switchElem = createGenderSwitch();
    let genderSpan = createGenderSpan();
    nameDiv.appendChild(nameInput);
    nameDiv.appendChild(switchElem);
    nameDiv.appendChild(genderSpan);
    return nameDiv;
};

function appendInitialNameSections() {
    addNameSection();
    addNameSection();
}

const showNames = () => {
    let namesDiv = document.querySelector(".names");
    appendInitialNameSections();
    showElement(namesDiv)
};

const showForm = () => {
    showNames();
};

const addNameSection = () => {
    let namesDiv = document.querySelector(".names");
    let nameSection = createNameSection();
    let numberOfChilds = namesDiv.childElementCount;
    namesDiv.insertBefore(nameSection, namesDiv.children[numberOfChilds - 2]);
};

const removeNameSection = () => {
    let namesDiv = document.querySelector(".names");
    let numberOfChilds = namesDiv.childElementCount;
    if (numberOfChilds > 4) {
        namesDiv.removeChild(namesDiv.children[numberOfChilds - 3]);
    }
};

const getRespectiveNameInput = checkbox => {
    let grandParent = checkbox.parentElement.parentElement;
    return grandParent.querySelector("input");
};

const changeColor = (input, span, checked) => {
    if (checked) {
        span.innerText = "♀";
        span.className = "feminine";
        input.className = input.className.replace("masculineInput", "feminineInput");
        return;
    }
    span.innerText = "♂";
    span.className = "masculine";
    input.className = input.className.replace("feminineInput", "masculineInput");
};

const changeInputColor = ({target}) => {
    let nameInput = getRespectiveNameInput(target);
    let genderSpan = nameInput.parentElement.lastChild;
    changeColor(nameInput, genderSpan, target.checked);
};

const addEventListenerToSwitches = switches => {
    let checkboxes = Array.from(switches).map(s => s.querySelector("input"));
    checkboxes.forEach(c => c.onchange = changeInputColor);
};

const addEventListeners = () => {
    let addButton = document.querySelector(".add");
    let removeButton = document.querySelector(".remove");
    let genderSwitches = document.querySelectorAll(".switch");
    addButton.onclick = addNameSection;
    removeButton.onclick = removeNameSection;
    addEventListenerToSwitches(genderSwitches);
};

const onload = () => {
    showForm();
    addEventListeners();
};
window.onload = onload;