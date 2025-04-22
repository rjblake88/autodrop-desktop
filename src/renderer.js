const { ipcRenderer } = require('electron');

let settings = { isPro: false, ghostMode: false };

async function loadSettings() {
  settings = await ipcRenderer.invoke('get-settings');
  document.getElementById('ghostCheckbox').checked = settings.ghostMode;
  document.getElementById('proCheckbox').checked = settings.isPro;
  document.getElementById('status').innerText = settings.isPro ? 'Pro Enabled' : 'Free Mode';
}

function togglePro() {
  settings.isPro = !settings.isPro;
  saveSettings();
  document.getElementById('status').innerText = settings.isPro ? 'Pro Enabled' : 'Free Mode';
}

function toggleGhost() {
  settings.ghostMode = !settings.ghostMode;
  saveSettings();
}

function saveSettings() {
  settings.ghostMode = document.getElementById('ghostCheckbox').checked;
  settings.isPro = document.getElementById('proCheckbox').checked;
  ipcRenderer.send('save-settings', settings);
  document.getElementById('status').innerText = settings.isPro ? 'Pro Enabled' : 'Free Mode';
}

loadSettings();
