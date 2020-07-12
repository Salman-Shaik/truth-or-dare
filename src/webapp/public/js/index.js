import {getAddButton, getAllNameSections, getNamesDiv, getNextButton, getRemoveButton} from "./common/ElementLibrary";
import {createElement, showElement, showErrorAlert,} from './common/methods'
import {fetchParticipants, saveParticipants} from "./common/networkCalls";
import _ from 'lodash';

const createNameInput = (name, gender) => {
    let nameInput = createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter First Name";
    nameInput.value = !!name ? name : "";
    nameInput.className = isFemale(gender)
        ? "nameInput feminineInput"
        : "nameInput masculineInput";
    return nameInput;
};

const checkCheckBox = (gender, checkbox) => {
    if (isFemale(gender)) {
        checkbox.checked = true;
    }
};

const createGenderSwitch = (gender) => {
    let switchElem = createElement("label");
    let checkbox = createElement("input");
    let span = createElement("span");
    switchElem.className = "switch";
    checkbox.type = "checkbox";
    checkCheckBox(gender, checkbox);
    span.className = "slider round";
    switchElem.appendChild(checkbox);
    switchElem.appendChild(span);
    switchElem.onclick = changeInputColor;
    return switchElem;
};

const isFemale = (gender) => gender === "F";
const setGenderSpanAttributes = (gender, span) => {
    if (isFemale(gender)) {
        span.innerText = "♀";
        span.className = "feminine";
    } else {
        span.className = "masculine";
        span.innerText = "♂";
    }
};

const createGenderSpan = (gender) => {
    let span = createElement("span");
    setGenderSpanAttributes(gender, span);
    return span;
};

const createNameSection = (name, gender) => {
    let nameDiv = createElement("div");
    nameDiv.className = "nameSection";
    let nameInput = createNameInput(name, gender);
    let switchElem = createGenderSwitch(gender);
    let genderSpan = createGenderSpan(gender);
    nameDiv.appendChild(nameInput);
    nameDiv.appendChild(switchElem);
    nameDiv.appendChild(genderSpan);
    nameDiv.onchange = capitalize;
    return nameDiv;
};

const appendInitialNameSections = () => {
    addNameSection();
    addNameSection();
};

const showNames = () => {
    let namesDiv = getNamesDiv();
    appendInitialNameSections();
    showElement(namesDiv);
};

const showForm = () => showNames();

const addNameSection = (name, gender) => {
    let namesDiv = getNamesDiv();
    let nameSection = createNameSection(name, gender);
    let numberOfChilds = namesDiv.childElementCount;
    if (numberOfChilds <= 11) {
        namesDiv.insertBefore(nameSection, namesDiv.children[numberOfChilds - 1]);
    }
    if (numberOfChilds + 1 === 11) {
        disableAddButton();
    }
};

const removeNameSection = ({target}) => {
    let namesDiv = getNamesDiv();
    let numberOfChilds = namesDiv.childElementCount;
    if (numberOfChilds > 3) {
        namesDiv.removeChild(namesDiv.children[numberOfChilds - 2]);
    }
    if (numberOfChilds - 1 === 3) {
        target.disabled = true;
    }
    if (numberOfChilds - 1 < 11) {
        enableAddButton();
    }
};

const getRespectiveNameInput = (checkbox) => {
    let grandParent = checkbox.parentElement.parentElement;
    return grandParent.querySelector("input");
};

const changeFromFemaleToMale = (input) =>
    changeInputColors(input, "feminineInput", "masculineInput");
const changeFromMaleToFemale = (input) =>
    changeInputColors(input, "masculineInput", "feminineInput");
const changeInputColors = (input, oldClassName, newClassName) =>
    input.className.replace(oldClassName, newClassName);

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

const isChecked = (element) => element.children[1].querySelector("input").checked;
const isBodyEmpty = (body) => !body.every((b) => b.participantName !== "" && b.gender !== "");
const areAllNamesValid = (body) => body.every((b) => b.participantName.match("^[A-Za-z]{1,10}$"));

const generateBody = () => {
    const nameSections = getAllNameSections();
    const body = [];
    nameSections.forEach((n) => {
        body.push({
            participantName: n.firstChild.value,
            gender: isChecked(n) ? "F" : "M",
        });
    });
    if (isBodyEmpty(body)) {
        throw new SyntaxError("All The Fields Should Be Filled");
    }
    if (!areAllNamesValid(body)) {
        throw new SyntaxError("All The Names Should Be <=10");
    }
    return JSON.stringify(body);
};

const saveParticipantsAndShowMode = async () => {
    let body;
    try {
        body = generateBody();
    } catch (e) {
        showErrorAlert(e.message);
    }
    const status = await saveParticipants(body);
    if (status === 201) window.location.href = "/mode";
};

const enableRemoveButton = () => getRemoveButton().disabled = false;
const disableAddButton = () => getAddButton().disabled = true;
const enableAddButton = () => getAddButton().disabled = false;
const capitalize = ({target}) => target.value = _.capitalize(target.value);

const addEventListeners = () => {
    let addButton = getAddButton();
    let removeButton = getRemoveButton();
    let nextButton = getNextButton();
    const names = getAllNameSections();
    addButton.onclick = () => {
        enableRemoveButton();
        addNameSection();
    };
    removeButton.onclick = removeNameSection;
    nextButton.onclick = saveParticipantsAndShowMode;
    names.forEach(name => name.onchange = capitalize)
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
    const nameSections = getAllNameSections();
    if (participants.length !== 0) {
        nameSections.forEach((n, i) =>
            fillParticipantsInDefaultSections(participants, n, i)
        );
        if (participants.length >= nameSections.length) {
            participants.forEach(fillParticipantsInNewSections);
        }
    }
};

const showData = async () => {
    const participants = await fetchParticipants();
    fillDataInNameSections(participants);
};

const onload = async () => {
    showForm();
    await showData();
    addEventListeners();
};
window.onload = onload;
