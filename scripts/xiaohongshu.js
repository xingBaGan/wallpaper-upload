const {
  platformUrl,
  phoneNumber,
  maxTimeout,
  imageBasePath,
} = require('./variable');
const { logger } = require('../utils/index');

async function deliverToXHS(page, text, imagePath, title) {
  const context = await page.context();
  const _page = await context.newPage();
  await _page.goto(platformUrl, {
    timeout: maxTimeout,
    waitUntil: 'load',
  });

  const subscribeBtn = await _page.getByText('发布笔记', { exact: true });
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const visiable = await subscribeBtn.isEnabled();
  if (!visiable) {
    await loginToXHSIfNot(_page, phoneNumber);
  } else {
    await subscribeBtn.click();
    uploadContent(_page, text, imagePath, title);
  }
  return _page;
}

async function uploadContent(page, content, imagePath, title) {
  const tab = await page.locator('div').filter({ hasText: /^上传图文$/ });
  await tab.click();
  const path = `${imagePath}`;
  logger.log('image path:', path);
  await page.getByRole('textbox').setInputFiles(path);
  // 读取文件
  const textArea = await page.locator('#post-textarea');
  await textArea.fill(content);
  const titleInput = await page.locator('.titleInput .el-input__inner[type=text]');
  await titleInput.fill(title);  
  await page.pause();
}

async function loginToXHSIfNot(page, phone) {
  const phoneInput = await page.getByPlaceholder('手机号');
  await phoneInput.fill(phone);
  const sendMSG = await page.getByText('发送验证码');
  // await sendMSG.click();
  const msgInput = page.getByPlaceholder('验证码');
  await msgInput.fill('123456');
}

module.exports = { deliverToXHS }