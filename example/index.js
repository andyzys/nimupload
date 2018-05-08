// import Uploader from 'nimuploader'
var Uploader = require('nimupload')

var uploader = Uploader({
  // 将后台生成的appkey等信息填写至此处
  'AppKey': '',
  'CheckSum': '',
  'CurTime': ,
  'Nonce': ,
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
