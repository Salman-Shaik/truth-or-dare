import {
    getCards,
    getCurrentName,
    getDareElement, getExitButton, getMain,
    getNames,
    getNameSection, getRollButton,
    getTruthElement
} from "./common/ElementLibrary";
import {createElement, sleep} from "./common/methods";
import {deleteGame, fetchDare, fetchParticipants, fetchTruth, updateGameStatus} from "./common/networkCalls";

let participants = [];
const createNameButton = (participantName) => {
    const button = createElement("button");
    button.className = "name";
    button.disabled = true;
    button.innerText = participantName;
    return button;
};

const fillNamesSections = (participants) => {
    const nameSection = getNameSection();
    participants.forEach((p) =>
        nameSection.appendChild(createNameButton(p.participantName))
    );
};

const showNames = async () => {
    const participants = await fetchParticipants();
    fillNamesSections(participants);
    return participants;
};

const getRandomParticipants = () => {
    let randomParticipants = [];
    const getRandom = (participants) => {
        const getRandomIndex = (size) => Math.floor(Math.random() * size);
        const index = getRandomIndex(participants.length);
        return participants[index];
    };
    for (let i = 0; i < 10; i++) randomParticipants.push(getRandom(participants));
    return randomParticipants;
};

const getNameButton = (participantName) => {
    const xpath = `//button[text()='${participantName}']`;
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;
};

const displayName = (name) => {
    const element = getCurrentName();
    element.value = name;
    element.innerText = name;
};

const insertTruthAndDare = (truth, dare) => {
    getTruthElement().innerHTML = `<p class="truth">${truth}</p>`;
    getDareElement().innerHTML = `<p class="dare">${dare}</p>`;
};

const getTruthAndDare = async () => {
    const truth = await fetchTruth();
    const dare = await fetchDare();
    insertTruthAndDare(truth, dare);
};

const showCards = () => getCards().style.visibility = "visible";
const hideCards = () => getCards().style.visibility = "hidden";

const highlightParticipant = async (rp, index) => {
    const disableAllNameButtons = () => {
        const names = getNames();
        names.forEach((n) => (n.disabled = true));
    };

    disableAllNameButtons();
    hideCards();
    const name = rp.participantName;
    const nameButton = getNameButton(name);
    nameButton.disabled = false;
    await sleep(400);
    if (index === 9) {
        displayName(name);
        await getTruthAndDare();
        showCards();
    }
};

const selectOneParticipant = async ({target}) => {
    target.disabled = true;
    const randomParticipants = getRandomParticipants();
    for (let i = 0; i < randomParticipants.length; i++) {
        await highlightParticipant(randomParticipants[i], i);
    }
    target.disabled = false;
};

const exitGame = async () => {
    await deleteGame();
    await setGameStatus(false);
    window.location.reload();
};

const addEventListeners = () => {
    getRollButton().onclick = selectOneParticipant;
    getExitButton().onclick = exitGame;
};

const createCurrentNameSpan = () => {
    const span = createElement("span");
    span.innerHTML =
        'It\'s <input type="text" class="currentName" readonly> turn';
    return span;
};

const addAndShowCurrentNameSection = () => {
    const main = getMain();
    const span = createCurrentNameSpan();
    main.insertBefore(span, main.firstChild);
};

const setGameStatus = async (status) => await updateGameStatus(status);

const onload = async () => {
    addAndShowCurrentNameSection();
    participants = await showNames();
    if (participants.length !== 0) {
        await setGameStatus(true);
    }
    addEventListeners();
};

const onUnload = async () => await exitGame();
window.onload = onload;
window.onunload = onUnload;

