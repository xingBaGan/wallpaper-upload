const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { 
  main,
  deliverWallpaper,
 } = require('./scripts/index');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('run-playwright', async (event, topic) => {
  await main(topic);
});

ipcMain.handle('deliver-wallpaper', async (event, topic) => {
  await deliverWallpaper(topic);
});

// 图片处理
ipcMain.handle('get-images', async (event, folderPath) => {
  return fs.readdirSync(folderPath).filter(file => {
    return /\.(jpg|jpeg|png|gif)$/i.test(file);
  });
});