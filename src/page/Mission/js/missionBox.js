import { createElementWithClass } from '../../../js/utils.js';

export class MissionBox {
    constructor(content) {
        this.content = content;
    }

    // Create and return a mission box element
    create() {
        const container = this.createContainer();
        const innerContainer = this.createInnerContainer();
        const paragraph = this.createParagraph();

        innerContainer.appendChild(paragraph);
        container.appendChild(innerContainer);

        return container;
    }

    // Create the outer container for the mission box
    createContainer() {
        return createElementWithClass("div", "bg-white p-3 w-100 rounded-4 pointer mb-3");
    }

    // Create the inner container for the mission box
    createInnerContainer() {
        return createElementWithClass("div", "gray-bg p-4 rounded-4");
    }

    // Create the paragraph element that displays the mission text
    createParagraph() {
        const paragraph = document.createElement("p");
        paragraph.className = "t-gray fs-5 word-spacing fw-bold";
        paragraph.textContent = this.content;
        return paragraph;
    }
}
