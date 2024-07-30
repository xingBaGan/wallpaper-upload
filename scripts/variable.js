const platformUrl = "https://creator.xiaohongshu.com/creator/home?source=official";
const phoneNumber = '17275953193';
const maxTimeout = 60000 * 3;
const path = require('path');
const { app } = require('electron');
let revPath = app && app.getAppPath();
revPath = revPath ? (revPath.includes("resources") ? revPath.split("\\").slice(0, -1).join("\\") : revPath) : "";
const imageBasePath = 'images';
const uploadPath = 'upload_images';
const exePath = path.join(app ? revPath : '', imageBasePath);
const imageUploadPath = path.join(app ? revPath : '', uploadPath);
const paperAccount = '13757508130';
const paperPwd = '181855Jzj';

module.exports = {
  platformUrl,
  phoneNumber,
  maxTimeout,
  imageBasePath: exePath,
  imageUploadPath,
  revPath,
  paperAccount,
  paperPwd,
}