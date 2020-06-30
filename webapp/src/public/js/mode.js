const getMode = () => {
  const modeDropdown = getElement(".modeDropDown");
  return { mode: modeDropdown.value };
};

const goToBoard = () => (window.location.href = "/board");
const goToPreviousPage = () => (window.location.href = "/");

const updateMode = async () => {
  const body = getMode();
  const status = await saveMode(body);
  if (status === 201) {
    goToBoard();
  }
};

const addEventListeners = () => {
  const nextButton = getElement(".next");
  const prevButton = getElement(".prev");
  nextButton.onclick = updateMode;
  prevButton.onclick = goToPreviousPage;
};

const showMode = () => {
  let modeDiv = getElement(".mode");
  showElement(modeDiv);
};

const onload = () => {
  showMode();
  addEventListeners();
};

window.onload = onload;
