const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const variablePath = path.join(__dirname, 'scripts', 'variable.js');
const { imageUploadBasePath } = require(variablePath);

contextBridge.exposeInMainWorld('electron', {
  runPlaywright: (topic) => ipcRenderer.invoke('run-playwright', topic),
  deliverToAishows: (topic) => ipcRenderer.invoke('deliver-wallpaper', topic),
  getImages: () => ipcRenderer.invoke('get-images'),
  // 删除文件夹中的，图片
  deleteImage: (folderPath) => ipcRenderer.invoke('delete-image', folderPath),
  imageUploadBasePath,
});
