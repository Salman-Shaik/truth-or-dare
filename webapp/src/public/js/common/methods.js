const showElement = (element) => {
  element.style.display = "block";
};

const showErrorAlert = (message) => {
  const errorMessage = document.querySelector(".errorMessage");
  errorMessage.innerHTML = message;
  errorMessage.parentElement.style.visibility = "visible";
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
