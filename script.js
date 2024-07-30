document.getElementById('run-button').addEventListener('click', async () => {
  enterFn();
});

document.getElementById('topic').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    enterFn();
  }
});

async function enterFn() {
  const topic = document.getElementById('topic').value;
  if(topic) {
    const result = await window.electron.runPlaywright(topic);
  }else {
    // 没有输入主题
    console.log('请输入主题');
  }
}