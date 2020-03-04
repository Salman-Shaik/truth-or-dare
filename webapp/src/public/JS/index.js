const showElement = element => {
    element.style.display = "block";
};

const showMode = () => {
    let modeDiv = document.querySelector(".mode");
    showElement(modeDiv);
};

const createNameInput = () => {
    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter Name";
    nameInput.className = "nameInput masculineInput";
    nameInput.pattern = "[A-Za-z]";
    return nameInput;
};

const createGenderSwitch = () => {
    let switchElem = document.createElement("label");
    let checkbox = document.createElement("input");
    let span = document.createElement("span");
    switchElem.className = "switch";
    checkbox.type = "checkbox";
    span.className = "slider round";
    switchElem.appendChild(checkbox);
    switchElem.appendChild(span);
    switchElem.onclick = changeInputColor;
    return switchElem;
};

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
    namesDiv.insertBefore(nameSection, namesDiv.children[numberOfChilds - 1]);
};

const removeNameSection = () => {
    let namesDiv = document.querySelector(".names");
    let numberOfChilds = namesDiv.childElementCount;
    if (numberOfChilds > 3) {
        namesDiv.removeChild(namesDiv.children[numberOfChilds - 2]);
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

const isChecked = element => element.children[1].querySelector("input").checked;

const isBodyValid = body => body.every(b => b.participantName !== "" && b.gender !== "");

const generateBody = () => {
    const nameSections = document.querySelectorAll(".nameSection");
    const body = [];
    nameSections.forEach(n => {
        body.push({
            participantName: n.firstChild.value,
            gender: isChecked(n) ? "F " : "M"
        });
    });
    if (!isBodyValid(body)) {
        throw new SyntaxError("All The Fields Should Be Filled");
    }
    return JSON.stringify(body);
};

const showErrorAlert = (message) => {
    const errorMessage = document.querySelector(".errorMessage");
    errorMessage.innerHTML= message;
    errorMessage.parentElement.style.visibility="visible"
};

const saveParticipantsAndShowMode = async () => {
    let body;
    try {
        body = generateBody();
    }catch (e) {
        showErrorAlert(e.message)
    }
    await fetch("http://localhost:8000/participants", {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'post',
        body: body
    });
};

const addEventListeners = () => {
    let addButton = document.querySelector(".add");
    let removeButton = document.querySelector(".remove");
    let nextButton = document.querySelector(".next");
    addButton.onclick = addNameSection;
    removeButton.onclick = removeNameSection;
    nextButton.onclick = saveParticipantsAndShowMode;
};

const onload = () => {
    showForm();
    addEventListeners();
};
window.onload = onload;