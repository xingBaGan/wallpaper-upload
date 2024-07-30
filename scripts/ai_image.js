const {
  maxTimeout,
} = require('./variable');
const { sendMsg, getMsg } = require('./ai_utils');

const imageUrl = 'https://www.coze.cn/store/bot/7347552807286964258?from=bots_card&panel=1&bid=6cmmklikk5g1i';

async function getImage(page, promptText){
  await page.goto(imageUrl, {
    timeout: maxTimeout,
    waitUntil: 'load',
  });
  return await getMsg(page, promptText, true);
}



async function getImageByPrompt(page, promptText){
  await page.goto(imageUrl, {
    timeout: maxTimeout,
    waitUntil: 'load',
  });
  return await sendMsg(page, promptText, true);
}


module.exports = { getImage,  getImageByPrompt};

