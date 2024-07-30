const {
  maxTimeout,
  imageBasePath,
} = require('./variable');
const https = require('https');
const fs = require('fs');

function requestImage(url, filename) {
  const imageUrl = url; // 替换为你的图片 URL
  return new Promise((resolve, reject)=>{
    https.get(imageUrl, (response) => {
      response.pipe(fs.createWriteStream(filename)).on('finish', () => {
        console.log('图片下载完成', filename);
        resolve(filename);
      });
    }).on('error', (err) => {
      console.error('下载图片时出错:', err);
      reject(err);
    });
  })
}
async function downloadImage(url, msg) {
  const filename = `${imageBasePath}/${msg || 'last'}.jpg`; // 你想要保存的文件名
   await requestImage(url, filename);
  return filename;
}

async function sendMsg(page, msg, isImage) {
  const input = await page.locator('.rc-textarea');
  await input.waitFor({
    state: 'visible',
    timeout: maxTimeout
  });
  if (msg) {
    await input.click();
    await input.fill(msg);
    await input.press('Enter');
    const loading = await page.getByText('停止响应');
    await loading.waitFor({ state: 'attached' });
    await loading.waitFor({ state: 'detached', timeout: maxTimeout });
  }
  const msgs = await page.locator('.chat-uikit-message-box-container__message').all();
  const answerContainer = await msgs[0].locator('.chat-uikit-message-box-inner');
  if (isImage) {
    const image = await answerContainer.locator('img').last();
    // 获取image 的url
    const src = await image.getAttribute('src');
    const filename = await downloadImage(src, msg);
    return filename;
  } else {
    const answer = await answerContainer.innerText();
    return answer;
  }
}
async function getMsg(page, isImage) {
  return await sendMsg(page, '', isImage);
}

async function addNewChat(page) {
  const clearButton = await page.locator('[data-test-id="chat-input-clear-context-button"]');
  await clearButton.click();
}

module.exports = {
  sendMsg,
  addNewChat,
  getMsg,
}