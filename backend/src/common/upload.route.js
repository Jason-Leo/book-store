const express = require('express');
const router = express.Router();
const { uploadImage, uploadImages, deleteImage } = require('./upload.controller');

// 上传单个图片
router.post('/single', uploadImage);

// 上传多个图片
router.post('/multiple', uploadImages);

// 删除图片
router.delete('/:filename', deleteImage);

module.exports = router;
