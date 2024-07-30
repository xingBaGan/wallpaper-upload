const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  runPlaywright: (topic) => ipcRenderer.invoke('run-playwright', topic)
});
