# NIMUpload

NIMUpload是一款用于浏览器端点播上传的软件开发工具包，提供简单、便捷的方法，方便用户开发上传视频或图片文件的功能。使用ESLint进行静态代码规范检查。

## Features

- 文件上传
- 断点续传
- 多文件状态管理

## Installation

一共有normal版和npm package版本。

- normal版直接引入相应js即可(依赖外部jQuery以及md5，需提前引入)：
	- uploader-normal-with-dependency-dist.js：主要是将本SDK代码与外部依赖 *md5* 和 *superagent* 打包至一个js中，用户直接引入一个script即可使用。
	- uploader-normal-no-dependency.js：仅仅包含本SDK源码，用户要想实现上传功能，需额外引入本SDK依赖 *jquery* 以及 *md5*。

	```html
	<script type="text/javascript" src="path/to/uploader-normal-with-dependency-dist.js"></script>
	<!-- 或者 -->
	<script type="text/javascript" src="path/to/jquery.js"></script>
	<script type="text/javascript" src="path/to/md5.js"></script>
	<script type="text/javascript" src="path/to/uploader-normal-no-dependency.js"></script>
	```

- npm package版本，通过如下指令即可完成安装:
	- 安装依赖

	```
	$ npm i md5 superagent
	```

	- 安装NIMUpload

	```
	$ npm i nimupload
	```


  两个版本的源文件位于项目根目录 **src** 文件夹下。

## Usage

调用本SDK时应先在HTML文件中添加一个用于选择文件的input标签一个用于上传的button标签。其ID可以自行指定然后作为参数传入或使用默认的ID（fileInput以及fileUpload）

在初始化时，必须传入参数 *AppKey*、*CheckSum*、*CurTime*、*Nonce*，即可完成鉴权，之后即可上传视频、图像文件至自己的网易云服务器上。

```html
<!-- 使用自定义id，需在初始化时将id传入 -->
<input type="file" id="cusInputId" value="" multiple>
<button id="cusButtonId">上传</button>
<!-- 若使用默认sdk中id，则可不传入id -->
<input type="file" id="fileInput" value="" multiple>
<button id="fileUpload">上传</button>
```

```js
var Uploader = require('nimupload')//仅npm package需要引入
var uploader = new Uploader({
  // 将后台生成的appkey等信息填写至此处
  'AppKey': '',			// required
  'CheckSum': '',		// required
  'CurTime': ,			// required
  'Nonce': ,			// required
	'fileInputId': 'cusInputId',			// optional
	'fileUploadId': 'cusButtonId'			// optional
  // 事件监听方式一：
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
// 事件监听方式二：
uploader.on('select', function(fileObj) {
  console.log('selected：' + fileObj.fileName);
});
uploader.on('progress', function(file) {
  console.log('onProgress：' + file.progress);
});
uploader.on('finished', function(file) {
  console.log('onFinished：' + file.fileName);
});
uploader.on('error', function(errObj) {
  console.log(errObj);
});
```

## Demo

本SDK的demo全部位于example文件夹中。

```
$ cd example
$ npm install
// run dev version
$ npm run dev
// deploy dist version
$ npm run build
```

dev模式在浏览器中打开 `http://localhost:12345` 即可访问，deploy则需要将生成的dist目录下的文件拷贝到任意静态服务器上即可运行(如果想将业务代码与当前SDK一起打包，只需修改webpack配置把多入口分开打包注释即可)。

## Testing

本框架使用Mocha+chai实现部分非用户交互部分测试，只需切换到主目录运行如下指令即可查看测试结果：

```
$ npm i
$ npm run test
```

## License

MIT
