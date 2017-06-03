const express = require('express');
const multer = require('multer');
const config = require('config-lite')(__dirname);
const router = express.Router();
const mongoose = require('mongoose');
const uuidV1 = require('uuid/v1');

const File = require('../models/file');
// connect to Mongoose
mongoose.connect(config.mongodb);

const storage = multer.diskStorage({
  // 用来确定上传的文件存储在哪个文件夹
  destination: function (req, file, callback) {
    callback(null, config.storage.dir)
  },
  // 用于确定上传后的文件保存名称
  filename: function (req, file, callback) {
    let suffix = file.originalname.split(".");
    let dir = file.mimetype.split('/')[0];
    let uuid=uuidV1();
    console.log(file);
    callback(null, dir + '/' + uuid.replace(/-/g,'') + '.' + suffix[suffix.length - 1])
  }
});

function fileFilter(req, file, cb) {
  console.log(file.mimetype.indexOf('image'));
  if (file.mimetype.indexOf('image') === -1 && file.mimetype.indexOf('audio') === -1 && file.mimetype.indexOf('video') === -1) {
    console.log('Got file of type', file.mimetype);
    console.log('false');
    // 错误处理 https://github.com/expressjs/multer/issues/336
    return cb(new Error('goes wrong on the mimetype'));
  }
  return cb(null, true);
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).single('file');

// 单文件上传
router.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      // 发生错误
      console.log(err);
      return res.json({
        code: 'error',
        msg: "请确认上传文件为图片、音频或视频"
      });
    }
    // 一切都好
    let path = req.file.filename;
    let filenameTmp = path.split("/");
    let filename = filenameTmp[filenameTmp.length - 1];

    let file = {
      size: req.file.size,
      type: req.file.mimetype,
      path: path,
      filename: filename
    };
    File.addFile(file, function (err, doc, next) {
      res.json({
        code: 'success',
        size: doc.size,
        filename: doc.filename,
        path: doc.path,
        url: config.storage.domain + '/' + path,
        create_date: doc.create_date
      });
    })
  })
});

// todo 多文件上传
// router.post('/new', upload.array('photo', 5), function (req, res, next) {
//     console.log(req);
//     res.send({
//         code:'success',
//         path:req.files[0].path,
//         url:'domain/'+req.files[0].path
//     });
// });
module.exports = router;
