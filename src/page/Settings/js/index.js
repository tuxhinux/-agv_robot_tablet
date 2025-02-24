class AppController {
    constructor() {
        this.initEventListeners();
    }

    // Initialize all event listeners
    initEventListeners() {
        this.addButtonListener("shutdown", this.shutdown);
        this.addButtonListener("restart", this.restart);
        this.addButtonListener("battery", this.handleBatteryClick);
    }

    // Add event listener to a button by its ID
    addButtonListener(buttonId, handler) {
        document.getElementById(buttonId).addEventListener("click", handler.bind(this));
    }

    // Handle shutdown
    shutdown() {
        window.electronAPI.shutdown();
    }

    // Handle restart
    restart() {
        window.electronAPI.restart();
    }

    // Handle battery click event
    async handleBatteryClick() {
        try {
            const data = await this.postBatteryRequest();
            this.handleMissionResponse(data);
        } catch (error) {
            console.error("[!] Error handling battery request:", error);
        }
    }

    // Post request for battery mission
    postBatteryRequest() {
        return window.electronAPI.postRequest(
            "http://localhost:5000/mission", 
            {
                "message": ["0"],
                "type": "battery"
            }
        );
    }

    // Handle the response from the mission request
    handleMissionResponse(data) {
        if (data.status === 200) {
            alert("Görev başarıyla eklendi.");
            window.electronAPI.navigateToPage("Home/index");
        } else {
            alert("Görev eklenirken beklenmedik bir hata ile karşılaşıldı.");
        }
    }
}

// Initialize the AppController when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    new AppController();
});

