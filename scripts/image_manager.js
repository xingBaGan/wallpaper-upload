const path = require('path');
const {
  pths,
  imageUploadBasePath,
} = require('./variable');
const { logger } = require('../utils/index');
const fs = require('fs');
const getImages = async () => {
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
  console.log('import', folderPath);
  
  // 将其他文件夹的图片，导入到imageBasePath 下
  const images = fs.readdirSync(folderPath).filter(file => {
    return /\.(jpg|jpeg|png|gif)$/i.test(file);
  });
  // copy to imageUploadBasePath
  images.forEach(image => {
    const imagePath = path.join(folderPath, image);
    const destPath = path.join(imageUploadBasePath, image);
    fs.copyFileSync(imagePath, destPath);
  });
}

module.exports = {
  getImages,
  deleteImage,
  importImages,
}