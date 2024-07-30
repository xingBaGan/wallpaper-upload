document.getElementById('run-button').addEventListener('click', async () => {
  enterFn();
});

document.getElementById('pic-button').addEventListener('click', async () => {
  deliverWallpaper();
});

document.getElementById('topic').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    enterFn();
  }
});

async function enterFn() {
  const topic = document.getElementById('topic').value;
  if (topic) {
    const result = await window.electron.runPlaywright(topic);
  } else {
    // 没有输入主题
    console.log('请输入主题');
  }
}

async function deliverWallpaper() {
  const topic = document.getElementById('pic-topic').value;
  if (topic) {
    const result = await window.electron.deliverToAishows(topic);
  } else {
    // 没有输入主题
    console.log('请输入主题');
  }
}

console.log('imageUploadBasePath', window.electron.imageUploadBasePath);
let folderPath;
let webImages;
document.getElementById('folderInput').addEventListener('change', async (event) => {
  if (folderPath) return;
  folderPath = event.target.files[0].path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
  // updateImageDisplay(folderPath);
});

async function removeImage(imageInex) {
  const imagePath = webImages[imageInex];
  console.log('webImages', webImages, imagePath);
  await window.electron.deleteImage(imagePath);
}

async function updateImageDisplay() {
  const images = await window.electron.getImages();
  webImages = images;
  console.log('images', images);
  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = '';
  images.forEach((image, index) => {
    const imgElement = document.createElement('div');
    imgElement.classList.add('image-item');
    imgElement.innerHTML = `
    <div>
      <button class="delete-btn">
        删除
      </button>
      <img src="file://${folderPath}/${image}" alt="${image}">
    </div>
    `;
    const deleteBtn = imgElement.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      removeImage(index);
      updateImageDisplay();
    });
    imageContainer.appendChild(imgElement);
  });
}

window.addEventListener('DOMContentLoaded', async ()=>{
  updateImageDisplay();
});