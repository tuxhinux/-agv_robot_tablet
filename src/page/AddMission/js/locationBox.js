import { createElementWithClass } from '../../../js/utils.js';

export function createLocationBox(index, location, id, removeLocationCallback) {
    const paragraph = createParagraph(index, location);
    const closeImg = createCloseIcon();

    const inputBg = createElementWithClass("div", "input-bg flex-grow-1 p-3 rounded-4", {}, paragraph);
    const redBg = createElementWithClass("div", "red-bg p-3 rounded-3 pointer", {}, closeImg);

    redBg.addEventListener("click", () => removeLocationCallback(id));

    return createElementWithClass("div", "d-flex justify-content-between align-items-center gap-3 mb-3", { id }, inputBg, redBg);
}

function createParagraph(index, location) {
    const paragraph = document.createElement("p");
    paragraph.className = "fs-5 fw-bold t-gray world-spacing";
    paragraph.textContent = `${index} : ${location}`;
    return paragraph;
}

function createCloseIcon() {
    const closeImg = document.createElement("img");
    closeImg.width = 24;
    closeImg.src = "../../assets/icon/addMission/close.svg";
    closeImg.alt = "Close";
    return closeImg;
}

