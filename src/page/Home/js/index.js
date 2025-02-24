import { CpuTemp } from "./cpuTemp.js";   
import { NetworkStatus } from "./networkStatus.js";

class App {
    constructor() {
        this.networkStatus = new NetworkStatus();
        this.cpuTemp = new CpuTemp();
    }

    // Initialize the app by fetching network status and CPU temperature
    async initialize() {
        await this.networkStatus.updateNetworkStatus();
        await this.cpuTemp.updateCpuTemperature();
    }
}

// Initialize the app after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    app.initialize();
});

