const showErrorAlert = (message) => {
    const errorMessage = getElement(".errorMessage");
    errorMessage.innerHTML = message;
    errorMessage.parentElement.style.visibility = "visible";
};

const showElement = (element) => element.style.display = "block";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getElement = selector => document.querySelector(selector);
const getAllElements = selector => document.querySelectorAll(selector);
const createElement = tagName => document.createElement(tagName);