import { Mission } from './mission.js';
import { MissionBox } from './missionBox.js';

class App {
    constructor() {
        this.missionManager = new Mission();
    }

    // Initialize the app and load mission data
    async initialize() {
        const missionFilePath = "mission.json";
        try {
            const data = await window.electronAPI.readJSON(missionFilePath);
            this.loadMissions(data);
        } catch (error) {
            console.error("[!] Error reading JSON file:", error);
        }
    }

    // Load missions into the container and add them to the mission manager
    loadMissions(data) {
        const container = document.getElementById("mission-container");

        if (!data.error) {
            data.forEach((item, index) => {
                const content = `${index}: ${item.join(', ')}`;
                const missionBox = new MissionBox(content).create();
                const uniqueId = `${Date.now().toString()}:${index}`;
                missionBox.id = uniqueId;

                container.appendChild(missionBox);
                this.missionManager.addMission(item, uniqueId);
            });
        }
    }

    // Set up event listener for the approve button
    setupApproveButton() {
        document.getElementById("approve-btn").addEventListener("click", this.handleApproval.bind(this));
    }

    // Handle the approval of the selected mission
    async handleApproval() {
        if (this.missionManager.selected == null) {
            alert("Please select a mission.");
            return;
        }

        try {
            const response = await window.electronAPI.postRequest("http://localhost:5000/mission", {
                message: this.missionManager.selected.roadMap,
                type: "default"
            });

            if (response.status === 200) {
                alert("Mission successfully added.");
                window.electronAPI.navigateToPage("Home/index");
            } else {
                alert("Unexpected error occurred while adding the mission.");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

// Initialize the app after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    app.initialize();
    app.setupApproveButton();
});

