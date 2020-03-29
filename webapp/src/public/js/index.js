const createNameInput = (name, gender) => {
    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter Name";
    nameInput.pattern = "[A-Za-z]";
    nameInput.value = !!name ? name : "";
    nameInput.className = isFemale(gender)
        ? "nameInput feminineInput"
        : "nameInput masculineInput";
    return nameInput;
};

const checkCheckBox = (gender, checkbox) => {
    if (isFemale(gender)) checkbox.checked = true;
};

const createGenderSwitch = (gender) => {
    let switchElem = document.createElement("label");
    let checkbox = document.createElement("input");
    let span = document.createElement("span");
    switchElem.className = "switch";
    checkbox.type = "checkbox";
    checkCheckBox(gender, checkbox);
    span.className = "slider round";
    switchElem.appendChild(checkbox);
    switchElem.appendChild(span);
    switchElem.onclick = changeInputColor;
    return switchElem;
};

const isFemale = gender => gender === 'F';

function setGenderSpanAttributes(gender, span) {
    if (isFemale(gender)) {
        span.innerText = "♀";
        span.className = "feminine";
    } else {
        span.className = "masculine";
        span.innerText = "♂";
    }
}

const createGenderSpan = (gender) => {
    let span = document.createElement("span");
    setGenderSpanAttributes(gender, span);
    return span;
};

const createNameSection = (name, gender) => {
    let nameDiv = document.createElement("div");
    nameDiv.className = "nameSection";
    let nameInput = createNameInput(name, gender);
    let switchElem = createGenderSwitch(gender);
    let genderSpan = createGenderSpan(gender);
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

const addNameSection = (name, gender) => {
    let namesDiv = document.querySelector(".names");
    let nameSection = createNameSection(name, gender);
    let numberOfChilds = namesDiv.childElementCount;
    if (numberOfChilds <= 8) {
        namesDiv.insertBefore(nameSection, namesDiv.children[numberOfChilds - 1]);
    }
    if (numberOfChilds + 1 === 8) {
        disableAddButton();
    }
};

const removeNameSection = ({target}) => {
    let namesDiv = document.querySelector(".names");
    let numberOfChilds = namesDiv.childElementCount;
    if (numberOfChilds > 3) {
        namesDiv.removeChild(namesDiv.children[numberOfChilds - 2]);
    }
    if (numberOfChilds - 1 === 3) {
        target.disabled = true;
    }
    if (numberOfChilds - 1 < 8) {
        enableAddButton();
    }
};

const getRespectiveNameInput = checkbox => {
    let grandParent = checkbox.parentElement.parentElement;
    return grandParent.querySelector("input");
};

const changeFromFemaleToMale = input => changeInputColors(input, "feminineInput", "masculineInput");
const changeFromMaleToFemale = input => changeInputColors(input, "masculineInput", "feminineInput");
const changeInputColors = (input, oldClassName, newClassName) => input.className.replace(oldClassName, newClassName)

const changeColor = (input, span, checked) => {
    if (checked) {
        span.innerText = "♀";
        span.className = "feminine";
        input.className = changeFromMaleToFemale(input);
        return;
    }
    span.innerText = "♂";
    span.className = "masculine";
    input.className = changeFromFemaleToMale(input);
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
            gender: isChecked(n) ? "F" : "M"
        });
    });
    if (!isBodyValid(body)) throw new SyntaxError("All The Fields Should Be Filled");
    return JSON.stringify(body);
};

const saveParticipantsAndShowMode = async () => {
    let body;
    try {
        body = generateBody();
    } catch (e) {
        showErrorAlert(e.message)
    }
    const status = await fetch("/participants", {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'post',
        body: body
    })
        .then(res => res.status)
        .catch(e => showErrorAlert("Didn't Save, Please Try Again!"));

    if (status === 200) window.location.href = "/mode";
};

const enableRemoveButton = () => {
    const removeButton = document.querySelector(".remove");
    removeButton.disabled = false;
};

const disableAddButton = () => {
    const removeButton = document.querySelector(".add");
    removeButton.disabled = true;
};

const enableAddButton = () => {
    const removeButton = document.querySelector(".add");
    removeButton.disabled = false;
};

const addEventListeners = () => {
    let addButton = document.querySelector(".add");
    let removeButton = document.querySelector(".remove");
    let nextButton = document.querySelector(".next");
    addButton.onclick = () => {
        enableRemoveButton();
        addNameSection();
    };
    removeButton.onclick = removeNameSection;
    nextButton.onclick = saveParticipantsAndShowMode;
};

const fillParticipantsInDefaultSections = (participants, nameSection, index) => {
    const gender = participants[index].gender;
    const nameInput = nameSection.firstChild;
    const checkbox = nameSection.childNodes[1].firstChild;
    const symbol = nameSection.lastChild;
    nameInput.value = participants[index].participantName;
    checkCheckBox(gender, checkbox);
    isFemale(gender) && (nameInput.className = changeFromMaleToFemale(nameInput));
    setGenderSpanAttributes(gender, symbol);
};

const fillParticipantsInNewSections = (p, index) => {
    if (index >= 2) {
        addNameSection(p.participantName, p.gender);
    }
};

const fillDataInNameSections = (participants) => {
    const nameSections = document.querySelectorAll('.nameSection');
    if (participants.length !== 0) {
        nameSections.forEach((n, i) => fillParticipantsInDefaultSections(participants, n, i));
        if (participants.length >= nameSections.length) {
            participants.forEach(fillParticipantsInNewSections);
        }
    }
};

const showData = async () => {
    const participants = await fetch("/participants")
        .then(res => res.text())
        .then(data => JSON.parse(data));
    fillDataInNameSections(participants);
};

const onload = () => {
    showForm();
    addEventListeners();
    showData();
};
window.onload = onload;