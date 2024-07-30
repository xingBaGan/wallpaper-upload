const { chromium } = require('playwright');
const path = require('path');
const { app } = require('electron');
const { revPath } = require('./variable');
const exePath = path.join(app ? revPath : '', 'chromium-1117', 'chrome-win', 'chrome.exe');
// console.log(exePath);
async function login() {
  // const pathToExtension = require('path').join(__dirname, '../3.89_0');
  const userDataDir = './tmp/test-user-data-dir';
  const browserContext = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    executablePath: exePath,
    // args: [
    //   `--disable-extensions-except=${pathToExtension}`,
    //   `--load-extension=${pathToExtension}`
    // ]
  });
  const pages = await browserContext.pages();
  return pages[0];
}

module.exports = { login };