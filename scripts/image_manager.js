const path = require('path');
const {
  pths,
  imageUploadBasePath
} = require('./variable');
const fs = require('fs');


const getImages = async () => {
  console.log('image', imageUploadBasePath);
  return fs.readdirSync(imageUploadBasePath).filter(file => {
    return /\.(jpg|jpeg|png|gif)$/i.test(file);
  });
}

const deleteImage = async (imageName) => {
  try {
    const imagePath = path.join(...pths, imageName);
    fs.unlinkSync(imagePath);
    console.log('符号链接已删除');
  } catch (e) {
    console.error('删除文件时出错:', e);
  }
}

const importImages = async (folderPath) => {
  // 将其他文件夹的图片，导入到imageBasePath 下
  const images = fs.readdirSync(folderPath).filter(file => {
    return /\.(jpg|jpeg|png|gif)$/i.test(file);
  });
}

module.exports = {
  getImages,
  deleteImage,
  importImages,
}