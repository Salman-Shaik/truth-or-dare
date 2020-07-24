import {getAllElements, getElement} from "./methods";

export const getNextButton = () => getElement(".next");
export const getPrevButton = () => getElement(".prev");
export const getModeDiv = () => getElement(".mode");
export const getModeDropdown = () => getElement(".modeDropDown");

export const getNamesDiv = () => getElement(".names");
export const getAllNameSections = () => getAllElements(".nameSection");
export const getAddButton = () => getElement(".add");
export const getRemoveButton = () => getElement(".remove");

export const getRollButton = () => getElement(".roll");
export const getExitButton = () => getElement(".exit");
export const getCloseButton = () => getElement(".close");
export const getMain = () => getElement("main");
export const getBody = () => getElement("body");
export const getNames = () => getAllElements(".name");
export const getCards = () => getElement(".cards");
export const getDareElement = () => getElement(".dareQuestion");
export const getTruthElement = () => getElement(".truthQuestion");
export const getCurrentName = () => getElement(".currentName");
export const getNameSection = () => getElement(".namesDiv");

export const getGamesDiv = () => getElement('.gamesDiv');

export const getErrorMessage = () => getElement(".errorMessage");