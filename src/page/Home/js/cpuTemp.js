export class CpuTemp {
    constructor() {
        this.tempElement = document.getElementById("tempature");
    }

    // Get CPU temperature and update UI
    async updateCpuTemperature() {
        try {
            const temperature = await window.electronAPI.getCpuTemperature();
            this.updateTemperature(temperature);
        } catch (err) {
            console.error(err);
        }
    }

    // Update the temperature display element
    updateTemperature(temperature) {
        this.tempElement.innerHTML = temperature;
    }
}

