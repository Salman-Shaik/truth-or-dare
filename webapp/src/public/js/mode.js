const getMode = () => {
    const modeDropdown = document.querySelector(".modeDropDown");
    return {mode: modeDropdown.value}
};

const saveMode = async () => {
    const body = getMode();
    const status = await fetch("mode", {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify(body),
    }).then(r => +r.status)
        .catch(e => showErrorAlert("Didn't Save, Please Try Again!"));
    if (status === 200) {
    }
};

const goToPreviousPage = () => window.location.href = "/";

const addEventListeners = () => {
    const nextButton = document.querySelector(".next");
    const prevButton = document.querySelector(".prev");
    nextButton.onclick = saveMode;
    prevButton.onclick = goToPreviousPage;
};

const showMode = () => {
    let modeDiv = document.querySelector(".mode");
    showElement(modeDiv);
};

const onload = () => {
    showMode();
    addEventListeners();
};

window.onload = onload;