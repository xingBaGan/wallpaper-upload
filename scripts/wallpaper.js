const {
  imageUploadPath,
  paperPwd,
  paperAccount,
  pths,
} = require('./variable')
const { getPage } = require('./getPage');
const fs = require('fs');
const path = require('path');
const { logger } = require('../utils/index');

const targetUrl = 'https://user.aishows.cn/wallpaper/edit';
async function openSite(page) {
  await page.goto(targetUrl);
}

async function checkRedirect(page) {
  const url = await page.url();
  const locator = await page.locator('.nav-user button');
  const count = await locator.count();
  // 判断元素是否存在
  const elementExists = count > 0;
  const isRedirected = (url !== targetUrl) || elementExists;
  return isRedirected;
}

async function login(page) {
  await page.getByRole('button', { name: '登录' }).click();
  await page.waitForSelector('input[name=username]'); // 等待登录表单出现
  // 输入账号密码，登录到工作页面
  await page.getByPlaceholder('请输入手机号').fill(paperAccount);
  await page.getByPlaceholder('输入密码').fill(paperPwd);
  // .input-box .main-btn
  await page.locator('.input-box .main-btn').click();
  // 等待登录完成
  await page.locator('.user .a-button').click();
  const newPage = await page.waitForEvent('popup');
  return newPage;
}

async function navigateToUploadPage(page) {
  // 判断打开了新的页面，并且打开了 https://user.aishows.cn/wallpaper 页面
  await page.locator('.left-nav-box .a-button').click();
  await page.waitForURL(targetUrl);
}

async function uploadImage(page, title) {
  // 读取 imageUploadPath 下的文件
  const files = fs.readdirSync(imageUploadPath);
  const paths = files.map((filename) => path.join(...pths, filename)).filter(path => !path.includes('.md'));
  logger.log('debug', paths);
  const input = await page.locator('input[type=file]');
  await input.setInputFiles(paths);
  // 设置分类
  await page.getByPlaceholder('请选择分类').click();
  await page.locator('li').filter({ hasText: '动漫' }).click();
  // 设置title
  await page.locator('form textarea').click();
  await page.locator('form textarea').fill(title || '动漫角色');
  // 设置decription
  await page.pause();
  // 点击上传
  // await page.getByRole('button', { name: '发布'});
  // 等待发布成功
  // await page.waitForSelector('div.upload-success'); // 假设上传成功的提示类名为 'upload-success'
  // console.log('图片上传成功');
}

async function autoWallpaperUpload(page, title) {
  let newPage = page;
  try {
    await openSite(page);
    const isRedirected = await checkRedirect(page);
    // console.log(
    //   'isRedirected',
    //   isRedirected
    // );
    if (isRedirected) {
      newPage = await login(page);
      await navigateToUploadPage(newPage);
    }
    await uploadImage(newPage, title);
  } catch (error) {
    console.error('发生错误:', error);
  }
}

async function deliverWallpaper(title) {
  const page = await getPage();
  await autoWallpaperUpload(page, title);
}
module.exports = {
  deliverWallpaper,
}