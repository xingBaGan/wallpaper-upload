const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  runPlaywright: (topic) => ipcRenderer.invoke('run-playwright', topic),
  deliverToAishows: (topic) => ipcRenderer.invoke('deliver-wallpaper', topic),
  getImages: (folderPath) => ipcRenderer.invoke('get-images', folderPath),
  // 删除文件夹中的，图片
  deleteImage: (folderPath) => ipcRenderer.invoke('delete-image', folderPath),
});
