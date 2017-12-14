// import Uploader from 'nimuploader'
var Uploader = require('nimupload')

var uploader = Uploader({
  'AppKey': '2f2a7935c3a5412a9a31be60924927f6',
  'CheckSum': 'e3e847f6a0d7c8d9a78c43a2bbe6d1d91db83acd',
  'CurTime': 1512629135,
  'Nonce': 1,
  // onSelectFile: function(fileObj) {
  //   console.log('selected' + fileObj);
  // },
  // onProgress: function(file) {
  //   console.log('onProgress' + file);
  // },
  // onFinished: function(file) {
  //   console.log('onFinished' + file);
  // },
  // onError: function() {
  //   console.log('出错了');
  // }
});
uploader.on('select', function(fileObj) {
  console.log('selected：' + fileObj.fileName);
});
uploader.on('progress', function(file) {
  console.log('onProgress：' + file.progress);
});
uploader.on('finished', function(file) {
  console.log('onFinished：' + file.fileName);
});
uploader.on('error', function() {
  console.log('出错了');
});
