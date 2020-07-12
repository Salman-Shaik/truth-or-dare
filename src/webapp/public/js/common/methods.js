import {getErrorMessage} from "./ElementLibrary";

export const showErrorAlert = (message) => {
    const errorMessage = getErrorMessage();
    errorMessage.innerHTML = message;
    errorMessage.parentElement.style.visibility = "visible";
};

export const parseGames = games => {
    const ids = Object.keys(games);
    return ids.map(id => {
        const {mode, participants} = games[id];
        return ({id, participants, mode});
    });
};

export const showElement = (element) => element.style.display = "block";
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const getElement = selector => document.querySelector(selector);
export const getAllElements = selector => document.querySelectorAll(selector);
export const createElement = tagName => document.createElement(tagName);