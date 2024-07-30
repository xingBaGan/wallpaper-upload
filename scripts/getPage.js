const { chromium } = require('playwright');
const path = require('path');
const { app } = require('electron');
const { revPath } = require('./variable');
const exePath = path.join(app ? revPath : '', 'chromium-1117', 'chrome-win', 'chrome.exe');
async function getPage() {
  const userDataDir = './tmp/test-user-data-dir';
  const browserContext = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    executablePath: exePath,
  });
  const pages = await browserContext.pages();
  return pages[0];
}

module.exports = { getPage };