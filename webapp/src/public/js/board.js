let participants = [];
const createNameButton = (participantName) => {
    const button = document.createElement("button");
    button.className = "name";
    button.disabled = true;
    button.innerText = participantName;
    return button;
};

const fillNamesSections = participants => {
    const nameSection = document.querySelector(".namesDiv");
    participants.forEach(p => nameSection.appendChild(createNameButton(p.participantName)));
};

const showNames = async () => {
    const participants = await fetch("/participants")
        .then(res => res.text())
        .then(data => JSON.parse(data))
        .catch(e => showErrorAlert("Didn't Fetch, Please Try Again!"));
    fillNamesSections(participants);
    return participants;
};

const getRandomParticipants = () => {
    let randomParticipants = [];
    const getRandom = participants => {
        const getRandomIndex = size => Math.floor(Math.random() * size);
        const index = getRandomIndex(participants.length);
        return participants[index];
    };
    for (let i = 0; i < 10; i++) randomParticipants.push(getRandom(participants));
    return randomParticipants;
};

const getNameButton = participantName => {
    const xpath = `//button[text()='${participantName}']`;
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
};

const displayName = name => {
    const element = document.querySelector(".currentName");
    element.value = name;
    element.innerText = name;
};

const insertTruthAndDare = (truth, dare) => {
    const truthElement = document.querySelector(".truthQuestion");
    const dareElement = document.querySelector(".dareQuestion");
    truthElement.innerHTML = `<p class="truth">${truth}</p>`;
    dareElement.innerHTML = `<p class="dare">${dare}</p>`;
};

const getTruthAndDare = async () => {
    const truth = await fetch("/truth")
        .then(res => res.text())
        .catch(e => showErrorAlert("Didn't Fetch, Please Try Again!"));
    const dare = await fetch("/dare")
        .then(res => res.text())
        .catch(e => showErrorAlert("Didn't Fetch, Please Try Again!"));
    insertTruthAndDare(truth, dare);
};

const highlightParticipant = async (rp, index) => {
    const disableAllNameButtons = () => {
        const names = document.querySelectorAll(".name");
        names.forEach(n => n.disabled = true);
    };

    disableAllNameButtons();
    const name = rp.participantName;
    const nameButton = getNameButton(name);
    nameButton.disabled = false;
    await sleep(400);
    if (index === 9) {
        displayName(name);
        await getTruthAndDare();
    }
};

const selectOneParticipant = async () => {
    const randomParticipants = getRandomParticipants();
    for (let i = 0; i < randomParticipants.length; i++) {
        await highlightParticipant(randomParticipants[i], i);
    }
};

const addEventListener = () => {
    const rollButton = document.querySelector(".roll");
    rollButton.onclick = selectOneParticipant;
};

const createCurrentNameSpan = () => {
    const span = document.createElement("span");
    span.innerHTML = "It's <input type=\"text\" class=\"currentName\" readonly> turn";
    return span;
};

const addAndShowCurrentNameSection = () => {
    const main = document.querySelector("main");
    const span = createCurrentNameSpan();
    main.insertBefore(span, main.firstChild);
};

const onload = async () => {
    addAndShowCurrentNameSection();
    participants = await showNames();
    addEventListener();
};
window.onload = onload;