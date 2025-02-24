const { contextBridge, ipcRenderer } = require("electron");
const axios = require("axios");

contextBridge.exposeInMainWorld("electronAPI", {
    readJSON: (filePath) => ipcRenderer.invoke("read-json", filePath),

    navigateToPage: (pageName) => ipcRenderer.invoke("navigate-to-page", pageName),

    getRequest: async (url) => {
        try {
            const response = await axios.get(url);
            return response.data; 
        } catch (error) {
            return { error: error.message }; 
        }
    },

    postRequest: async (url, data) => {
        try {
            const response = await axios.post(url, data);
            return response.data; 
        } catch (error) {
            return { error: error.message }; 
        }
    },

    getNetworkStatus: async () => {
        return await ipcRenderer.invoke("get-network-status");
    },

    getCpuTemperature: async () => ipcRenderer.invoke("get-cpu-temperature"),

    addNewList: async (newList, filePath) => ipcRenderer.invoke("add-new-list", newList, filePath),
    shutdown: () => ipcRenderer.send("shutdown"),
    restart: () => ipcRenderer.send("restart")
});

