import { createLocationBox } from './locationBox.js';
import { createElementWithClass } from '../../../js/utils.js';

class AddMission {
    constructor() {
        this.data = [];
    }

    async setup() {
        const locationSelect = document.getElementById("location-select");
        this.addMissionEventListener(locationSelect);
        this.approveMissionEventListener();
        this.loadExistingMissions();
    }

    createOption(value) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        return option;
    }

    addMissionEventListener(locationSelect) {
        document.getElementById("add").addEventListener("click", () => {
            const selectedLocation = locationSelect.value;
            if (this.isLocationValid(selectedLocation)) {
                const uniqueId = this.generateUniqueId(selectedLocation);
                this.addMissionToData(selectedLocation, uniqueId);
                this.appendMissionToContainer(selectedLocation, uniqueId);
            }
        });
    }

    approveMissionEventListener() {
        document.getElementById("approve").addEventListener("click", () => {
            if (this.data.length > 0) {
                this.saveMissions();
            }
        });
    }

    isLocationValid(selectedLocation) {
        if (!selectedLocation || selectedLocation === "Bölge seç") {
            alert("Please select a region.");
            return false;
        }

        if (this.isLocationDuplicate(selectedLocation)) {
            alert("You cannot select the same region consecutively.");
            return false;
        }

        return true;
    }

    isLocationDuplicate(selectedLocation) {
        const lastMission = this.data[this.data.length - 1];
        return lastMission && lastMission.location === selectedLocation;
    }

    generateUniqueId(location) {
        const index = this.data.length + 1;
        return `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
    }

    addMissionToData(location, uniqueId) {
        this.data.push({ id: uniqueId, location });
    }

    appendMissionToContainer(location, uniqueId) {
        const container = document.getElementById("mission-container");
        const index = this.data.length;
        const removeLocationCallback = (id) => this.removeLocation(id);  // Define callback
        const newElement = createLocationBox(index, location, uniqueId, removeLocationCallback);
        container.appendChild(newElement);
    }

    async saveMissions() {
        const missionFilePath = "mission.json";
        const roadMap = this.data.map(item => item.location);
        await window.electronAPI.addNewList(roadMap, missionFilePath);

        alert("Mission successfully added.");
        this.data = [];
        this.refreshMissionList();
        window.electronAPI.navigateToPage("Mission/index");
    }

    refreshMissionList() {
        const container = document.getElementById("mission-container");
        container.innerHTML = "";

        this.data.forEach((item, index) => {
            const removeLocationCallback = (id) => this.removeLocation(id);  // Define callback
            const newElement = createLocationBox(index, item.location, item.id, removeLocationCallback);
            container.appendChild(newElement);
        });
    }

    loadExistingMissions() {
        this.data.forEach((item, index) => {
            const removeLocationCallback = (id) => this.removeLocation(id);  // Define callback
            const newElement = createLocationBox(index, item.location, item.id, removeLocationCallback);
            document.getElementById("mission-container").appendChild(newElement);
        });
    }

    removeLocation(id) {
        this.data = this.data.filter(item => item.id !== id);
        document.querySelector(`#${CSS.escape(id)}`).remove();
        this.refreshMissionList();
    }
}

export { AddMission };

