const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('src/index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('get-settings', () => {
  try {
    const data = fs.readFileSync('settings.json');
    return JSON.parse(data);
  } catch {
    return { isPro: false, ghostMode: false };
  }
});

ipcMain.on('save-settings', (event, data) => {
  fs.writeFileSync('settings.json', JSON.stringify(data));
});
