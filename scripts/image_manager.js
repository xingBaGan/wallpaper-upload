const path = require('path');
const {
  pths
} = require('./variable');
const fs = require('fs');

const getImages = async (folderPath) => {
  return fs.readdirSync(folderPath).filter(file => {
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

module.exports = {
  getImages,
  deleteImage,
}