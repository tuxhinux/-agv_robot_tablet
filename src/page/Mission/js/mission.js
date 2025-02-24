import { createElementWithClass } from '../../../js/utils.js';

export class Mission {
    constructor() {
        this.data = []; 
        this.selected = null;
    }

    // Add new mission to the list
    addMission(roadMap, containerId) {
        const mission = { roadMap, containerId };
        this.data.push(mission);
        this.setupElement(containerId);
    }

    // Set up event listener on each mission container
    setupElement(containerId) {
        const container = document.getElementById(containerId);
        container.addEventListener("click", () => this.toggleMissionSelection(containerId));
    }

    // Toggle the selection of a mission container
    toggleMissionSelection(containerId) {
        if (this.selected && this.selected.containerId === containerId) {
            this.deselectMission();
        } else {
            this.selectMission(containerId);
        }
    }

    // Deselect the current mission
    deselectMission() {
        this.setElementStyle(this.selected.containerId, false);
        this.selected = null;
    }

    // Select a new mission
    selectMission(containerId) {
        if (this.selected) {
            this.setElementStyle(this.selected.containerId, false);
        }

        this.setElementStyle(containerId, true);
        this.selected = this.data.find(item => item.containerId === containerId);
    }

    // Apply or remove styles based on the active state
    setElementStyle(elementId, activate) {
        const container = document.getElementById(elementId);
        const innerContainer = container.querySelector("div");
        const paragraph = innerContainer.querySelector("p");

        const styles = this.getElementStyles(activate);

        container.classList.remove(styles.container.remove);
        innerContainer.classList.remove(styles.innerContainer.remove);
        paragraph.classList.remove(styles.paragraph.remove);

        container.classList.add(styles.container.add);
        innerContainer.classList.add(styles.innerContainer.add);
        paragraph.classList.add(styles.paragraph.add);
    }

    // Get styles for activation or deactivation
    getElementStyles(activate) {
        return {
            container: {
                add: activate ? "light-blue-bg" : "bg-white",
                remove: activate ? "bg-white" : "light-blue-bg"
            },
            innerContainer: {
                add: activate ? "blue-bg" : "gray-bg",
                remove: activate ? "gray-bg" : "blue-bg"
            },
            paragraph: {
                add: activate ? "text-white" : "t-gray",
                remove: activate ? "t-gray" : "text-white"
            }
        };
    }
}


