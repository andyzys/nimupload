"use strict"

let chai = require('chai')
let assert = chai.assert
let expect = chai.expect

let NIMUpload = require('../src/uploader-npm')

describe('上传测试', function() {
  let params = {'AppKey': '2f2a7935c3a5412a9a31be60924927f6','CheckSum': 'e3e847f6a0d7c8d9a78c43a2bbe6d1d91db83acd','CurTime': 1512629135,'Nonce': 1}
  let uploader = new NIMUpload(params)

  describe('#new NIMUpload()', function() {
    it('初始化上传实例', function() {
      expect(uploader).to.have.property('_');
      let options = uploader._.options
      expect(options).to.have.property('CheckSum');
      expect(options).to.have.property('CurTime');
      expect(options).to.have.property('Nonce');
      expect(options).to.have.property('fileUploadId');
      expect(options).to.have.property('fileInputId');
    });
  });

  describe('#initEvent()', function() {
    it('HTML Element绑定事件', function() {
      let fileInputId = params['fileInputId'] || 'fileInput'
      let fileUploadId = params['fileUploadId'] ||'fileUpload'
      expect(typeof document.getElementById(fileInputId).removeEventListener).to.equal('function')
      expect(typeof document.getElementById(fileUploadId).removeEventListener).to.equal('function')
    });
  });

  describe('#on()', function() {
    it('on事件转化及执行', function() {
      let temp1 = null,
        temp2   = null,
        temp3   = null,
        temp4   = null
      let fileObj = {
        file: {
          name: 'fileName'
        },
        fileSizeMb: '1.23',
        status: 1,
        progress: 0.53,
        fileName: 'fileName'
      }
      temp1 = uploader.on('select', function(){return 'onSelect'})
      temp2 = uploader.on('error', function(){return 'onError'})
      temp3 = uploader.on('progress', function(){return 'onProgress'})
      temp4 = uploader.on('finished', function(){return 'onFinished'})
      expect(temp1._.options.onSelect(fileObj)).to.equal('onSelect')
      expect(temp2._.options.onError({})).to.equal('onError')
      expect(temp3._.options.onProgress(fileObj)).to.equal('onProgress')
      expect(temp4._.options.onFinished(fileObj)).to.equal('onFinished')
    });
  });

  describe('#checkExistInFileList', function() {
    it('检查问价后缀有效性', function() {
      let res = uploader.checkExistInFileList({name: 'filename', size: 123456})
      expect(res).to.be.false
    });
  });

  describe('#options', function() {
    it('检查克隆options方法', function() {
      let obj = uploader.options({
        AppKey       : 'AppKey',
        fileExts     : [1, 2, 3],
        trunkSize    : 4
      });
      expect(obj._.options.AppKey).to.equal('AppKey')
      expect(obj._.options.fileExts.length).to.equal(3)
      expect(obj._.options.trunkSize).to.equal(4)
    });
  });

  describe('#checkPending', function() {
    it('检查pending方法', function() {
      uploader._.options.fileList = [{checked: true, status: 0}]
      expect(uploader.checkPending()).to.be.true
      uploader._.options.fileList = []
      expect(uploader.checkPending()).to.be.false
    });
  });

});
