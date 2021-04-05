import {
  getModeDiv,
  getModeDropdown,
  getNextButton,
  getPrevButton,
} from "./common/ElementLibrary";
import { showElement } from "./common/methods";
import { saveMode } from "./common/networkCalls";

const getMode = () => ({ mode: getModeDropdown().value });
const goToBoard = () => (window.location.href = "/board");
const goToPreviousPage = () => (window.location.href = "/");
const showMode = () => showElement(getModeDiv());

const updateMode = async () => {
  const body = getMode();
  const status = await saveMode(body);
  if (status === 201) goToBoard();
};

const addEventListeners = () => {
  const nextButton = getNextButton();
  const prevButton = getPrevButton();
  nextButton.onclick = updateMode;
  prevButton.onclick = goToPreviousPage;
};

const onload = () => {
  showMode();
  addEventListeners();
};

window.onload = onload;
