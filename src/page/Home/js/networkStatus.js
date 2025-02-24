export class NetworkStatus {
    constructor() {
        this.ipHeaderElement = document.getElementById("ip-header");
        this.ipAddressElement = document.getElementById("ip-address");
        this.wifiBlueImg = document.getElementById("wifi-blue-img");
        this.wifiRedImg = document.getElementById("wifi-red-img");
    }

    // Get network status and update UI
    async updateNetworkStatus() {
        try {
            const data = await window.electronAPI.getNetworkStatus();
            this.updateIpHeader(data);
            this.updateIpAddress(data.ip);
            this.toggleWifiIcons(data.connected);
        } catch (err) {
            console.error(err);
        }
    }

    // Update the header text based on network connection
    updateIpHeader(data) {
        const headerText = data.connected ? "İnternete Bağlı" : "İnternete Bağlı Değil";
        const colorCss = data.connected ? "t-green" : "t-red";
        
        this.ipHeaderElement.innerHTML = headerText;
        this.ipHeaderElement.classList.add(colorCss);

        // If not connected, apply the red color
        if (!data.connected) {
            this.ipHeaderElement.classList.remove("t-gray");
            this.ipHeaderElement.classList.add("t-red");
        }
    }

    // Update the IP address element
    updateIpAddress(ip) {
        this.ipAddressElement.innerHTML = ip;
    }

    // Toggle the wifi icons based on the connection status
    toggleWifiIcons(isConnected) {
        if (!isConnected) {
            this.wifiBlueImg.classList.add("d-none");
            this.wifiRedImg.classList.remove("d-none");
        }
    }
}

