const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  runPlaywright: (topic) => ipcRenderer.invoke('run-playwright', topic),
  deliverToAishows: (topic) => ipcRenderer.invoke('deliver-wallpaper', topic),
  getImages: (folderPath) => ipcRenderer.invoke('get-images', folderPath)
});
