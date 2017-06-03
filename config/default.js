module.exports = {
  port: 3000,
  storage: {
    domain: 'http://a.b.c',
    // 文件保存路径，默认为upload/目录下，保存在其他路径，务必还请在该路径下，创建audio,image,video目录
    dir: 'upload/'
  },
  mongodb: 'mongodb://localhost:27017/file'
};
