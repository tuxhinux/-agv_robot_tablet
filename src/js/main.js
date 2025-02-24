const { app, BrowserWindow, ipcMain } = require("electron");

const path = require("node:path");
const fs = require("fs");

const os = require("os");
const dns = require("dns");

const si = require("systeminformation");

const { exec } = require("child_process");

let mainWindow; 

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 820,
        fullscreen: true,
        fullscreenable: true,
        simpleFullscreen: true,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true, 
            contextIsolation: true
        },
    });

    mainWindow.loadFile("./src/page/Home/index.html");
}

function ensureMissionJson() {
    const userDataPath = app.getPath("userData");
    const missionJsonPath = path.join(userDataPath, "mission.json");

    if (!fs.existsSync(missionJsonPath)) {
        console.log(`[!] 'mission.json' file not found, creating: ${missionJsonPath}`);

        const dirPath = path.dirname(missionJsonPath);
        fs.mkdirSync(dirPath, { recursive: true });

        const defaultContent = [ 
            ["S1","3","4","S1","1","2","S1"],
            ["S1","2","1","S2","4","3","S1"],
            ["S2","1","2","S1","3","4","S2"],
            ["S2","4","3","S1","2","1","S2"],
            ["S1","S2","A","S1","C","D","S1","B","S2","S1"],
            ["S1","B","S2","S1","D","C","S1","A","S2","S1"],
            ["S2","S1","D","S2","B","A","S2","C","S1","S2"],
            ["S2","S1","C","S2","A","B","S2","D","G","S1","S2"]
        ];

        fs.writeFileSync(missionJsonPath, JSON.stringify(defaultContent, null, 4), "utf8");
        console.log(`[+] The file 'mission.json' was created successfully.`);
    } else {
        console.log(`[✓] The 'mission.json' file already exists: ${missionJsonPath}`);
    }
}

app.whenReady().then(() => {
    ensureMissionJson();
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.handle("read-json", async (event, filePath) => {
    try {
        const userDataPath = app.getPath("userData");
        const missionJsonPath = path.join(userDataPath, filePath);

        const data = fs.readFileSync(missionJsonPath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error("[!] Error reading JSON file :", err);
        return { error: "[!] File could not be read." };
    }
});

ipcMain.handle("navigate-to-page", (event, pageName) => {
    const window = BrowserWindow.getFocusedWindow(); 
    if (window) {
        window.loadFile(`src/page/${pageName}.html`); 
    }
});

function getIPAddress() {
    const networkInterfaces = os.networkInterfaces();

    for (const interfaceName in networkInterfaces) {
        const interfaceDetails = networkInterfaces[interfaceName];

        for (const detail of interfaceDetails) {
            if (detail.family === "IPv4" && !detail.internal) {
                return detail.address;
            }
        }
    }

    return "0.0.0.0";
}

function isInternetConnected() {
    return new Promise((resolve) => {
        dns.lookup("google.com", (err) => {
            resolve(!err); 
        });
    });
}

ipcMain.handle("get-network-status", async () => {
    const ip = getIPAddress();
    const connected = await isInternetConnected();
    return { ip, connected };
});

async function getCpuTemperature() {
  try {
    const temperatureData = await si.cpuTemperature();
    return temperatureData.main; 
  } catch (error) {
    console.error("Tempature not found:", error);
    return null;
  }
}

ipcMain.handle("get-cpu-temperature", async () => {
  return await getCpuTemperature();
});

function readJsonFile(filePath) {
    try {
        const userDataPath = app.getPath("userData");
        const missionJsonPath = path.join(userDataPath, filePath);

        const data = fs.readFileSync(missionJsonPath, "utf8");
        
        return JSON.parse(data); 
    } catch (error) {
        console.error("[!] JSON doesnt read:", error);
        return []; 
    }
}

function addNewList(newList, filePath) {
    const jsonData = readJsonFile(filePath);
    jsonData.push(newList);

    try {
        const userDataPath = app.getPath("userData");
        const missionJsonPath = path.join(userDataPath, filePath);

        fs.writeFileSync(missionJsonPath, JSON.stringify(jsonData, null, 4), "utf8");
        console.log("[!] Yeni liste başarıyla eklendi!");
    } catch (error) {
        console.error("[!] JSON dosyasına yazılamadı:", error);
    }
}

ipcMain.handle("add-new-list", async (event,newList, filePath) => {
  return await addNewList(newList, filePath);
});

ipcMain.on("shutdown", () => {
  exec("shutdown -h now", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});

ipcMain.on("restart", () => {
  exec("reboot", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});
