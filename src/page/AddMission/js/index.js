import { AddMission } from './addMission.js';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const addMission = new AddMission();
        addMission.setup();
    } catch (error) {
        console.error("[!] Error reading JSON file:", error);
    }
});

