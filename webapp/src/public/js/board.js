let participants = [];
const createNameButton = (participantName) => {
  const button = document.createElement("button");
  button.className = "name";
  button.disabled = true;
  button.innerText = participantName;
  return button;
};

const fillNamesSections = (participants) => {
  const nameSection = document.querySelector(".namesDiv");
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
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
};

const displayName = (name) => {
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
    .then((res) => res.text())
    .catch((e) => showErrorAlert("Didn't Fetch, Please Try Again!"));
  const dare = await fetch("/dare")
    .then((res) => res.text())
    .catch((e) => showErrorAlert("Didn't Fetch, Please Try Again!"));
  insertTruthAndDare(truth, dare);
};

const showCards = () => {
  const cards = document.querySelector(".cards");
  cards.style.visibility = "visible";
};

const hideCards = () => {
  const cards = document.querySelector(".cards");
  cards.style.visibility = "hidden";
};

const highlightParticipant = async (rp, index) => {
  const disableAllNameButtons = () => {
    const names = document.querySelectorAll(".name");
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
    showCards();
    await getTruthAndDare();
  }
};

const selectOneParticipant = async () => {
  const randomParticipants = getRandomParticipants();
  for (let i = 0; i < randomParticipants.length; i++) {
    await highlightParticipant(randomParticipants[i], i);
  }
};

const exitGame = async () => {
  await deleteGame();
  await setGameStatus(false);
  window.location.reload();
};

const addEventListeners = () => {
  const rollButton = document.querySelector(".roll");
  const exitButton = document.querySelector(".exit");
  rollButton.onclick = selectOneParticipant;
  exitButton.onclick = exitGame;
};

const createCurrentNameSpan = () => {
  const span = document.createElement("span");
  span.innerHTML =
    'It\'s <input type="text" class="currentName" readonly> turn';
  return span;
};

const addAndShowCurrentNameSection = () => {
  const main = document.querySelector("main");
  const span = createCurrentNameSpan();
  main.insertBefore(span, main.firstChild);
};

const setGameStatus = async (status) => {
  await updateGameStatus(status);
};

const onload = async () => {
  addAndShowCurrentNameSection();
  participants = await showNames();
  if (participants.length !== 0) {
    console.log("Hello");
    await setGameStatus(true);
  }

  addEventListeners();
};
window.onload = onload;
