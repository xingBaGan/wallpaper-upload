const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  runPlaywright: (topic) => ipcRenderer.invoke('run-playwright', topic),
  deliverToAishows: (topic) => ipcRenderer.invoke('deliver-wallpaper', topic),
  getImages: () => ipcRenderer.invoke('get-images'),
  // 删除文件夹中的，图片
  deleteImage: (folderPath) => ipcRenderer.invoke('delete-image', folderPath),
  importImages: (folderPath) => ipcRenderer.invoke('import-image', folderPath),
  getImageUploadBasePath: () => ipcRenderer.invoke('get-path'),
});
