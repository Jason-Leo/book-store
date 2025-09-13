const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置 multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名：时间戳 + 随机数 + 原始扩展名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// 文件过滤器
const fileFilter = (req, file, cb) => {
  // 只允许图片文件
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('只允许上传图片文件'), false);
  }
};

// 创建 multer 实例
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 限制文件大小为 5MB
  }
});

// 上传单个图片
const uploadSingle = upload.single('image');

// 上传多个图片
const uploadMultiple = upload.array('images', 5); // 最多5张图片

// 上传图片控制器
const uploadImage = (req, res) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: '上传失败',
        error: err.message,
        code: 400
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: '没有选择文件',
        code: 400
      });
    }

    // 返回文件信息
    res.status(200).json({
      message: '上传成功',
      file: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: `/uploads/${req.file.filename}` // 返回访问路径
      },
      code: 200
    });
  });
};

// 上传多张图片控制器
const uploadImages = (req, res) => {
  uploadMultiple(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: '上传失败',
        error: err.message,
        code: 400
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: '没有选择文件',
        code: 400
      });
    }

    // 返回文件信息数组
    const files = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: `/uploads/${file.filename}`
    }));

    res.status(200).json({
      message: '上传成功',
      files: files,
      code: 200
    });
  });
};

// 删除图片控制器
const deleteImage = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadDir, filename);

  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      message: '文件不存在',
      code: 404
    });
  }

  // 删除文件
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({
        message: '删除失败',
        error: err.message,
        code: 500
      });
    }

    res.status(200).json({
      message: '删除成功',
      code: 200
    });
  });
};

module.exports = {
  uploadImage,
  uploadImages,
  deleteImage,
  upload // 导出 multer 实例供其他路由使用
};
