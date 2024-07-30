const { login } = require('./login');
const fs = require('fs');
const { deliverToXHS } = require('./xiaohongshu');
const {
  maxTimeout,
  phoneNumber,
} = require('./variable');
const {
  sendMsg,
  addNewChat,
  getMsg,
} = require('./ai_utils');

const { getImage, getImageByPrompt } = require('./ai_image');
const { expect } = require('playwright/test');

// 读取文件名字参数
const arggs = process.argv.slice(2);
// console.log('arggs', process.argv);
const isDev =  process.argv[1] && process.argv[1].includes('dev');
const topicName = arggs[0] || '爱一个可以随时打扰的人';
const imagePrompt = '二次元少女';
const bid = '6cbrf1k7c4g0';
let contentURL = `https://www.coze.cn/store/bot/7362179298414837775?from=bots_card&panel=1`;

async function miniTimeFn(page, time, fn) {
  page.setDefaultTimeout(time);
  if(fn){
    await fn();
  }
  page.setDefaultTimeout(30000);
}

async function loginCoze(page) {
  await page.goto(contentURL, {
    timeout: maxTimeout,
    waitUntil: 'load',
  });
  try {
    await page.waitForURL(contentURL, { waitUntil: 'networkidle' });
    const isVisible = false;
    await miniTimeFn(page, 1000, async () => {
      const btn = await page.getByRole('button', { name: '开始使用', timeout: 1000});
      isVisible = await btn.isEnabled();
    })
    const btn = await page.getByRole('button', { name: '开始使用', timeout: 1000});
    if (isVisible) {
      await page.getByRole('button', { name: '开始使用' }).click();
      await page.getByPlaceholder('请输入手机号').click();
      await page.getByPlaceholder('请输入手机号').fill(phoneNumber);
      await page.getByRole('button', { name: '下一步' }).click();
      await page.getByLabel('confirm').click();
      await page.pause();
      await page.getByRole('button', { name: '下一步' }).click();
    }
  }catch (e) {
    console.log('loginCoze', e);
  }
  return page;
}

async function main(topic = topicName) {
  const page = await login();
  await loginCoze(page);
  const answer = await sendMsg(page, topic);
  // const answer = await getMsg(page);
  const path = await getImageByPrompt(page, topic);
  // const path = '二次元少女.jpg';
  // const path = 'C:\\Users\\jzj\\Pictures\\爱壁纸UWP\\动漫\\动漫.jpg';
  // const answer = 'text';
  await deliverToXHS(page, answer, path, topic);
}

module.exports = {
  main
}